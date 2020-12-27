package com.nvisions.solutionsforaccessibility.VoiceSearch;

import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class VoiceSearchWithoutAccessibilityActivity extends AppCompatActivity implements View.OnClickListener {
    private MediaPlayer mediaPlayer;
    private MediaPlayer mPlayer;
    private TextView textView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_voice_search_without_accessibility);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        setTitle(getString(R.string.badExample));
        final Button example1 = (Button)findViewById(R.id.button1);
        mediaPlayer = MediaPlayer.create(this, R.raw.start);
        mPlayer = MediaPlayer.create(this, R.raw.end);
        textView = (TextView)findViewById(R.id.textView3);
        mediaPlayer.start();

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                mPlayer.start();
                textView.setText(R.string.voiceNotUnderstand);
                example1.setText(R.string.voiceListen);
            }
        }, 5000);

        example1.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.button1:
                Button example1 = (Button)findViewById(R.id.button1);
                TextView textView = (TextView)findViewById(R.id.textView3);
                if (example1.getText().toString() == getString(R.string.voiceCancel)) {
                    example1.setText(R.string.voiceListen);
                    example1.setEnabled(true);
                    textView.setVisibility(View.GONE);
                } else {
                    example1.setText(R.string.voiceCancel);
                    example1.setEnabled(false);
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
                Button example1 = (Button)findViewById(R.id.button1);
                example1.setText(R.string.voiceListen);
                example1.setEnabled(true);
            }
        }, 5000);
    }
}

