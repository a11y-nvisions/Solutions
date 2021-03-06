package com.nvisions.solutionsforaccessibility.carousel;

import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.accessibility.AccessibilityManager;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ViewFlipper;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class CarouselExample1Activity extends AppCompatActivity {
    boolean playing = true;
    private Handler handler = new Handler();
    private Runnable runnable = new Runnable() {
        @Override
        public void run() {
            ViewFlipper flipper = (ViewFlipper) findViewById(R.id.flipper);
            flipper.showNext();
            handler.postDelayed(this, 4000);
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_carousel_example1);
        handler.post(runnable);

        final ImageButton playPause = (ImageButton) findViewById(R.id.imageButton);
        final Button next = (Button)findViewById(R.id.next);
        final Button previous = (Button)findViewById(R.id.previous);
        final ViewFlipper flipper = (ViewFlipper) findViewById(R.id.flipper);
        playPause.setVisibility(View.INVISIBLE);
        previous.setVisibility(View.INVISIBLE);
        next.setVisibility(View.INVISIBLE);

        next.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                flipper.showNext();
                flipper.setAccessibilityLiveRegion(View.ACCESSIBILITY_LIVE_REGION_ASSERTIVE);
            }
        });

        previous.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                flipper.showPrevious();
                flipper.setAccessibilityLiveRegion(View.ACCESSIBILITY_LIVE_REGION_ASSERTIVE);
            }
        });

        playPause.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (playing) {
                    handler.removeCallbacks(runnable);
                    playing = false;
                    playPause.setImageResource(android.R.drawable.ic_media_play);
                    playPause.setContentDescription("슬라이드 재생");
                } else {
                    handler.post(runnable);
                    playing = true;
                    playPause.setImageResource(android.R.drawable.ic_media_pause);
                    playPause.setContentDescription("슬라이드 정지");
                }
            }
        });

    }

    }
