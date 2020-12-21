package com.nvisions.solutionsforaccessibility.WebView;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class WebViewActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview);
        setTitle(R.string.webView);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    public void launchWebViewWithoutAccessibilityActivity(View view) {
        Intent intent = new Intent(getApplicationContext(), WebViewWithoutAccessibilityActivity.class);
        startActivity(intent);
    }

    public void launchWebViewWithAccessibilityActivity(View view) {
        Intent intent = new Intent(getApplicationContext(), WebViewWithAccessibilityActivity.class);
        startActivity(intent);
    }
}
