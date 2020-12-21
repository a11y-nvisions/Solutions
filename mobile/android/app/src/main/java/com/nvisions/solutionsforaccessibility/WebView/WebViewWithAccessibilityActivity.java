package com.nvisions.solutionsforaccessibility.WebView;

import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.accessibility.AccessibilityEvent;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class WebViewWithAccessibilityActivity extends AppCompatActivity {
    WebView browser;
    ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview_with_accessibility);
        setTitle(R.string.goodExample);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        browser=findViewById(R.id.browser);
        progressBar = findViewById(R.id.progressBar);

        WebSettings websettings = browser.getSettings();
        websettings.setDomStorageEnabled(true);  // Open DOM storage function
        websettings.setAppCacheMaxSize(1024*1024*8);
        String appCachePath = getApplicationContext().getCacheDir().getAbsolutePath();
        websettings.setAppCachePath(appCachePath);
        websettings.setAllowFileAccess(true);    // Readable file cache
        websettings.setAppCacheEnabled(true);    //Turn on the H5(APPCache) caching function
        websettings.setJavaScriptEnabled(true);

        browser.setWebViewClient(new WebViewClient() {
            public void onPageStarted(WebView view, String url,
                                      android.graphics.Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
                progressBar.setVisibility(View.VISIBLE);
            };


            public void onPageFinished(WebView view, String url) {
                // do your stuff here
                progressBar.setVisibility(View.INVISIBLE);


                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        browser.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
                    }
                }, 1000);


            }
        });
        browser.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                progressBar.setProgress(newProgress);
                progressBar.sendAccessibilityEvent(AccessibilityEvent.TYPE_VIEW_FOCUSED);
                progressBar.setContentDescription(newProgress+"%");
            }
        });


        browser.loadUrl("https://a11y-nvisions.github.io/Solutions/WEB/example.radioButton/index.html");
    }

    @Override
    public void onBackPressed() {
        if (browser.canGoBack()) {
            browser.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
