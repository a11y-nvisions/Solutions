package com.nvisions.solutionsforaccessibility.overlay;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.provider.Settings;
import android.view.View;
import android.view.accessibility.AccessibilityManager;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class FocusActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_focus);
        if(getActionBar() != null) {
            getActionBar().setDisplayHomeAsUpEnabled(true);
        }
        if(!isTalkBackEnabled()) {
            showTalkBackAlertPopup();
        }
    }

    private void showTalkBackAlertPopup() {
        AlertDialog.Builder gsDialog = new AlertDialog.Builder(this);
        gsDialog.setTitle("토크백");
        gsDialog.setMessage("데모를 보려면 토크백을 활성화해야 합니다.");
        gsDialog.setPositiveButton("확인", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int which) {
                // 설정화면으로 보내는 부분
                startActivity(new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS));
                return;
            }
        }).create().show();
    }

    private boolean isTalkBackEnabled() {
        AccessibilityManager accessibilityManager = (AccessibilityManager) getSystemService(Context.ACCESSIBILITY_SERVICE);
        boolean isAccessibilityEnabled = accessibilityManager.isEnabled();
        boolean isExploreByTouchEnabled = accessibilityManager.isTouchExplorationEnabled();

        return isAccessibilityEnabled && isExploreByTouchEnabled;
    }

    public void launchSubWithoutAccessibilityActivity(View view) {
        Intent intent = new Intent(this, SubWithoutAccessibilityActivity.class);
        startActivity(intent);
    }

    public void launchSubWithAccessibilityActivity(View view) {
        Intent intent = new Intent(this, SubWithAccessibilityActivity.class);
        startActivity(intent);
    }


}
