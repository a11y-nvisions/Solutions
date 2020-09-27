package com.nvisions.solutionsforaccessibility.music;

import android.app.Activity;
import android.content.Context;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;
import android.view.accessibility.AccessibilityManager;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class MusicGoodActivity extends AppCompatActivity {
    private Context mContext;
    private Activity mActivity;
    private Button mButtonPlay;
    private Button mButtonStop;
    private SeekBar mSeekBar;
    private TextView mPass;
    private TextView mDuration;
    private TextView mDue;
    private MediaPlayer mPlayer;
    private Handler mHandler;
    private Runnable mRunnable;
    int value1;
    boolean value2;
    boolean isFromUser;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_music_good);
        if(getActionBar() != null) {
            getActionBar().setDisplayHomeAsUpEnabled(true);
        }
        final AccessibilityManager accessibilityManager = (AccessibilityManager) getSystemService(Context.ACCESSIBILITY_SERVICE);
        // Get the application context
        mContext = getApplicationContext();
        mActivity = MusicGoodActivity.this;

        // Get the widget reference from xml layout
        mButtonPlay = findViewById(R.id.btn_play);
        mButtonStop = findViewById(R.id.btn_stop);
        mSeekBar = findViewById(R.id.seek_bar);
        mSeekBar.setVisibility(View.INVISIBLE);
        mButtonStop.setVisibility(View.INVISIBLE);
        mPass = findViewById(R.id.tv_pass);
        mDuration = findViewById(R.id.tv_duration);
        mDue = findViewById(R.id.tv_due);

        // Initialize the handler
        mHandler = new Handler();

        // Click listener for playing button
        mButtonPlay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // If media player another instance already running then stop it first
                stopPlaying();
                mButtonStop.setVisibility(View.VISIBLE);
                // Initialize media player
                mPlayer = MediaPlayer.create(mContext,R.raw.sunset);
                // Start the media player
                mPlayer.start();
                mSeekBar.setVisibility(View.VISIBLE);
                // Get the current audio stats
                getAudioStats();
                // Initialize the seek bar
                initializeSeekBar();
                String replay = getResources().getString(R.string.replay);
                mButtonPlay.setText(replay);
                mButtonStop.setText(getResources().getString(R.string.pause));
                mButtonStop.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
            }
        });

        // Set a click listener for top playing button
        mButtonStop.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (mPlayer.isPlaying()) {
                    mPlayer.pause();
                    mButtonStop.setText(getResources().getString(R.string.play));
                } else {
                    mPlayer.start();
                    mButtonStop.setText(getResources().getString(R.string.pause));
                }
                mButtonStop.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_SELECTED);
            }
        });

        // Set a change listener for seek bar
        mSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int i, boolean b) {
                isFromUser = b;
                value1 = i;
                value2 = b;
                if (accessibilityManager.isEnabled()) {
                    if(mPlayer!=null && value2){
                        mPlayer.seekTo(value1*1000);
                    }
                    if (isFromUser == true) {
                        accessibilityManager.interrupt();
                    }
                }
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {
            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                if(mPlayer!=null && value2){
                    mPlayer.seekTo(value1*1000);
                }
            }
        });

        mSeekBar.setAccessibilityDelegate(new View.AccessibilityDelegate() {
            @Override
            public void sendAccessibilityEvent(View host, int eventType) {
                if (!isFromUser && eventType == AccessibilityEvent.CONTENT_CHANGE_TYPE_CONTENT_DESCRIPTION) {
                    return;
                }
                super.sendAccessibilityEvent(host, eventType);
            }
        });
    }

    @Override
    protected void onPause() {
        super.onPause();
        stopPlaying();
    }

    protected void stopPlaying(){
        // If media player is not null then try to stop it
        if(mPlayer!=null){
            mPlayer.stop();
            mPlayer.release();
            mPlayer = null;
            if(mHandler!=null){
                mHandler.removeCallbacks(mRunnable);
            }
        }
    }

    protected void getAudioStats(){
        int duration  = mPlayer.getDuration()/1000; // In milliseconds
        int due = (mPlayer.getDuration() - mPlayer.getCurrentPosition())/1000;
        int pass = duration - due;
        String mPassText = getResources().getString(R.string.mPass);
        String second = getResources().getString(R.string.second);
        mPass.setText("" + pass + second);
        mPass.setContentDescription(mPassText + pass + second);
        mDuration.setText("" + duration + second);
        String mDuration2 = getResources().getString(R.string.mDuration);
        mDuration.setContentDescription(mDuration2 + duration + second);
        mDue.setText("" + due + second);
        String mDue2 = getResources().getString(R.string.mDue);
        mDue.setContentDescription(mDue2 + due + second);
    }

    protected void initializeSeekBar(){
        mSeekBar.setMax(mPlayer.getDuration()/1000);
        mRunnable = new Runnable() {
            @Override
            public void run() {
                if(mPlayer!=null){
                    int mCurrentPosition = mPlayer.getCurrentPosition()/1000; // In milliseconds
                    mSeekBar.setProgress(mCurrentPosition);
                    getAudioStats();
                }
                mHandler.postDelayed(mRunnable,1000);
            }
        };
        mHandler.postDelayed(mRunnable,1000);
    }
}

