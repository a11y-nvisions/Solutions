package com.nvisions.solutionsforaccessibility.refreshContents;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class RefreshContentsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_refresh_contents);
        setTitle(getString(R.string.refreshContents));
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    public void launchRefreshContentsWithoutAccessibilityActivity(View view) {
        Intent intent = new Intent(getApplicationContext(), RefreshContentsWithoutAccessibilityActivity.class);
        startActivity(intent);
    }

    public void refreshContentsWithAccessibilityActivity(View view) {
        Intent intent = new Intent(getApplicationContext(), RefreshContentsWithAccessibilityActivity.class);
        startActivity(intent);
    }
}

