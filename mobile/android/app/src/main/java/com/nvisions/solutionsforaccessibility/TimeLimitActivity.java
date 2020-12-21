package com.nvisions.solutionsforaccessibility;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.provider.Settings;
import android.view.View;
import android.view.accessibility.AccessibilityManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import java.util.Timer;
import java.util.TimerTask;

import static android.view.accessibility.AccessibilityManager.FLAG_CONTENT_CONTROLS;
import static android.view.accessibility.AccessibilityManager.FLAG_CONTENT_TEXT;

public class TimeLimitActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_time_limit);

        // detecting TalkBack and alert popup
        if(!isTalkBackEnabled()) {
             showTalkbackAlertPopup();
        }
    }

    private void showTalkbackAlertPopup() {
        AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(
                this);
        String activate = getResources().getString(R.string.activate_talkback);
                String cancel = getResources().getString(R.string.cancel);
                String ok = getResources().getString(R.string.ok);
        alertDialogBuilder
                .setMessage(activate)
                .setCancelable(false)
                .setNegativeButton(cancel, new DialogInterface.OnClickListener() {

                    @Override
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.dismiss();
                    }
                })
                .setPositiveButton(ok, new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.dismiss();

                        Intent intent = new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS);
                        startActivity(intent);
                    }
                });

        AlertDialog alertDialog = alertDialogBuilder.create();
        alertDialog.show();
    }

    private boolean isTalkBackEnabled() {
        AccessibilityManager accessibilityManager = (AccessibilityManager) getSystemService(Context.ACCESSIBILITY_SERVICE);
        boolean isAccessibilityEnabled = accessibilityManager.isEnabled();
        boolean isExploreByTouchEnabled = accessibilityManager.isTouchExplorationEnabled();

        return isAccessibilityEnabled && isExploreByTouchEnabled;
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    public void showDialogWithoutGetRecommendedTimeoutMillis(View view) {
        final int timeoutMillis = 10000;
        final int[] timeoutSec = {timeoutMillis/1000};
        final Dialog dialog = getDialog(timeoutSec);
        dialog.show();

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                dialog.dismiss();
            }
        }, timeoutMillis);
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    public void showDialogWithGetRecommendedTimeoutMillis(View view) {
        AccessibilityManager accessibilityManager = (AccessibilityManager) getSystemService(Context.ACCESSIBILITY_SERVICE);
        final int recommendedTimeoutMills = accessibilityManager.getRecommendedTimeoutMillis(10000, FLAG_CONTENT_TEXT | FLAG_CONTENT_CONTROLS);
        final int[] timeoutSec = {recommendedTimeoutMills/1000};

        final Dialog dialog = getDialog(timeoutSec);
        dialog.show();

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                dialog.dismiss();
            }
        }, recommendedTimeoutMills);
    }

    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    private Dialog getDialog(final int[] timeoutSec) {
        final Dialog dialog = new Dialog(this);
        dialog.setContentView(R.layout.custom_dialog);

        final TextView text = dialog.findViewById(R.id.text);
        String dialog_content = getResources().getString(R.string.dialog_text);
        text.setText(dialog_content);


        ImageView image = dialog.findViewById(R.id.image);
        image.setImageResource(R.drawable.ic_launcher_foreground);

        Button dialogButton = dialog.findViewById(R.id.dialogButtonOK);
        dialogButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog.dismiss();
            }
        });

        final Timer timer = new Timer();

        dialog.setOnShowListener(new DialogInterface.OnShowListener() {
            @Override
            public void onShow(DialogInterface dialog) {
                timer.schedule(new TimerTask() {
                    @Override
                    public void run() {
                        timeoutSec[0] = timeoutSec[0] - 1;

                        if (timeoutSec[0] == 0) {
                            timer.cancel();
                        }

String seconds = getResources().getString(R.string.seconds);
                        text.setText(timeoutSec[0] + seconds);

                    }
                }, 1000, 1000);
            }
        });

        dialog.setOnDismissListener(new DialogInterface.OnDismissListener() {
            @Override
            public void onDismiss(DialogInterface dialog) {
                timer.cancel();
            }
        });
        return dialog;
    }
}

