package com.nvisions.solutionsforaccessibility;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.CollapseExpand.CollapseExpandActivity;
import com.nvisions.solutionsforaccessibility.CustomControl.CustomControlActivity;
import com.nvisions.solutionsforaccessibility.LiveRegion.LiveRegionActivity;
import com.nvisions.solutionsforaccessibility.NestedScroll.NestedScrollActivity;
import com.nvisions.solutionsforaccessibility.RatingBar.RatingBarActivity;
import com.nvisions.solutionsforaccessibility.TabControl.TabControlActivity;
import com.nvisions.solutionsforaccessibility.VoiceSearch.VoiceSearchActivity;
import com.nvisions.solutionsforaccessibility.WebView.WebViewActivity;
import com.nvisions.solutionsforaccessibility.carousel.CarouselActivity;
import com.nvisions.solutionsforaccessibility.korailTalk.KorailTalkActivity;
import com.nvisions.solutionsforaccessibility.labelFor.LabelForActivity;
import com.nvisions.solutionsforaccessibility.music.MusicActivity;
import com.nvisions.solutionsforaccessibility.overlay.FocusActivity;
import com.nvisions.solutionsforaccessibility.progress.ProgressBarActivity;
import com.nvisions.solutionsforaccessibility.RatingBar.RatingBarActivity;
import com.nvisions.solutionsforaccessibility.recyclerview.StayFocusActivity;
import com.nvisions.solutionsforaccessibility.refreshContents.RefreshContentsActivity;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button liveRegion = (Button) findViewById(R.id.live_region);
        liveRegion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), LiveRegionActivity.class);
                startActivity(intent);
            }
        });

        Button labelFor = (Button) findViewById(R.id.label_for);
        labelFor.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), LabelForActivity.class);
                startActivity(intent);
            }
        });

        Button carousel = (Button) findViewById(R.id.carousel);
        carousel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), CarouselActivity.class);
                startActivity(intent);
            }
        });

        Button fix_focus = (Button)findViewById(R.id.fix_focus);
        fix_focus.setOnClickListener(new View.OnClickListener() {
         @Override
         public void onClick(View view) {
             Intent intent = new Intent(getApplicationContext(),    StayFocusActivity.class);
             startActivity(intent);
         }
        });

        Button progressBar = (Button)findViewById(R.id.progressBar);
        progressBar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), ProgressBarActivity.class);
startActivity(intent);
            }
        });

        Button timeLimit = (Button)findViewById(R.id.timeLimit);
        timeLimit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), TimeLimitActivity.class);
                startActivity(intent);
            }
        });

        Button musicPlayer = (Button)findViewById(R.id.musicPlayer);
        musicPlayer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), MusicActivity.class);
                startActivity(intent);
            }
        });

        Button overlay = (Button)findViewById(R.id.overlay);
        overlay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), FocusActivity.class);
                startActivity(intent);
            }
        });

        Button ratingBar = (Button)findViewById(R.id.ratingBar);
        ratingBar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), RatingBarActivity.class);
                startActivity(intent);
            }
        });

        Button nestedScroll = (Button)findViewById(R.id.nestedScroll);
        nestedScroll.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), NestedScrollActivity.class);
                startActivity(intent);
            }
        });

        Button tabControl = (Button)findViewById(R.id.tabControl);
        tabControl.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), TabControlActivity.class);
                startActivity(intent);
            }
        });

        Button collapseExpand = (Button)findViewById(R.id.collapseExpand);
        collapseExpand.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), CollapseExpandActivity.class);
                startActivity(intent);
            }
        });

        Button webView = (Button)findViewById(R.id.webView);
        webView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), WebViewActivity.class);
                startActivity(intent);
            }
        });

        Button korailTalk = (Button)findViewById(R.id.korailTalk);
        korailTalk.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), KorailTalkActivity.class);
                startActivity(intent);
            }
        });

        Button voiceSearch = (Button) findViewById(R.id.voiceSearch);
        voiceSearch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), VoiceSearchActivity.class);
                startActivity(intent);
            }
        });

        Button refreshContents = (Button) findViewById(R.id.refreshContents);
        refreshContents.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), RefreshContentsActivity.class);
                startActivity(intent);
            }
        });

        Button customControlButton = (Button)findViewById(R.id.customControlButton);
        customControlButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), CustomControlActivity.class);
                startActivity(intent);
            }
        });

    }
}

