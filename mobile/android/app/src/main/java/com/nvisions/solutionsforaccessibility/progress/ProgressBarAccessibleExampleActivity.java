package com.nvisions.solutionsforaccessibility.progress;

import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;
import android.widget.Button;
import android.widget.ProgressBar;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class ProgressBarAccessibleExampleActivity extends AppCompatActivity {
    private ProgressBar pgsBar;
    private int i = 0;
    private Handler hdlr = new Handler();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_progress_baraccessible_example);
        if (getActionBar() != null) {
            getActionBar().setDisplayHomeAsUpEnabled(true);
        }

        pgsBar = (ProgressBar) findViewById(R.id.pBar);
        final Button btn = (Button)findViewById(R.id.btnShow);
        final Button btn2 = (Button)findViewById(R.id.btnReset);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                btn.setEnabled(false);
                btn2.setEnabled(true);
                i = pgsBar.getProgress();
                pgsBar.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
                new Thread(new Runnable() {
                    public void run() {
                        while (i < 100) {
                            i += 1;
                            // Update the progress bar and display the current value in text view
                            hdlr.post(new Runnable() {
                                public void run() {
                                    pgsBar.setProgress(i);
                                    pgsBar.setContentDescription(i+"%");
                                }
                            });
                            try {
                                // Sleep for 100 milliseconds to show the progress slowly.
                                Thread.sleep(300);
                            } catch (InterruptedException e) {
                                e.printStackTrace();
                            }
                        }
                    }
                }).start();
            }
        });
        btn2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                pgsBar.setProgress(0);
                pgsBar.setContentDescription("0%");
                btn.setEnabled(true);
                btn2.setEnabled(false);
                String string = getString(R.string.progressResetComplete);
                v.announceForAccessibility(string);
            }
        });
    }
}


