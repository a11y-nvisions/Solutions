package com.nvisions.solutionsforaccessibility.VoiceSearch;

import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.ViewCompat;

import com.nvisions.solutionsforaccessibility.R;

public class VoiceSearchWithAccessibilityActivity extends AppCompatActivity implements View.OnClickListener {
    private MediaPlayer mediaPlayer;
    private MediaPlayer mPlayer;
private TextView textView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_voice_search_with_accessibility);
setTitle("");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle(getString(R.string.voiceSearch));
final Button example1 = (Button)findViewById(R.id.button1);
        ViewCompat.setImportantForAccessibility(getWindow().getDecorView(), ViewCompat.IMPORTANT_FOR_ACCESSIBILITY_NO_HIDE_DESCENDANTS);
mediaPlayer = MediaPlayer.create(this, R.raw.start);
mPlayer = MediaPlayer.create(this, R.raw.end);
textView = (TextView)findViewById(R.id.textView3);
mediaPlayer.start();
new Handler().postDelayed(new Runnable() {
    @Override
    public void run() {
        ViewCompat.setImportantForAccessibility(getWindow().getDecorView(), ViewCompat.IMPORTANT_FOR_ACCESSIBILITY_YES);
    }
}, 1000);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                mPlayer.start();
                textView.setText(R.string.voiceNotUnderstand);
                example1.setText(R.string.voiceListen);
                textView.sendAccessibilityEvent(AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED);
new Handler().postDelayed(new Runnable() {
    @Override
    public void run() {
        example1.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
    }
}, 1000);
            }
        }, 5000);

            example1.setOnClickListener(this);
    }

    @Override
    public void onClick(final View view) {
        switch (view.getId()) {
            case R.id.button1:
                Button example1 = (Button)findViewById(R.id.button1);
                TextView textView = (TextView)findViewById(R.id.textView3);
                if (example1.getText().toString() == getString(R.string.voiceCancel)) {
    example1.setText(R.string.voiceListen);
    textView.setVisibility(View.GONE);
                } else {
                    example1.setText(R.string.voiceCancel);
                    mediaPlayer.start();
                    textView.setText(R.string.voiceListening);
                }
                break;
        }

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                mPlayer.start();
                textView.setText(R.string.voiceNotUnderstand);
                view.announceForAccessibility(getString(R.string.voiceNotUnderstand));
                Button example1 = (Button)findViewById(R.id.button1);
                example1.setText(R.string.voiceListen);
            }
        }, 5000);
    }
}

