package com.nvisions.solutionsforaccessibility.VoiceSearch;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class VoiceSearchActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_voice_search);
        setTitle(getString(R.string.voiceSearch));
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    public void launchVoiceSearchWithoutAccessibilityActivity(View view) {
        Intent intent = new Intent(getApplicationContext(), VoiceSearchWithoutAccessibilityActivity.class);
        startActivity(intent);
    }

    public void launchVoiceSearchWithAccessibility(View view) {
        Intent intent = new Intent(getApplicationContext(), VoiceSearchWithAccessibilityActivity.class);
        startActivity(intent);
    }
}

