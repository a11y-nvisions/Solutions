package com.nvisions.solutionsforaccessibility.WebView;

import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class WebViewWithoutAccessibilityActivity extends AppCompatActivity {
    WebView browser;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview_without_accessibility);
        setTitle(R.string.badExample);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        browser=findViewById(R.id.browser);

        WebSettings websettings = browser.getSettings();
        websettings.setDomStorageEnabled(true);  // Open DOM storage function
        websettings.setAppCacheMaxSize(1024*1024*8);
        String appCachePath = getApplicationContext().getCacheDir().getAbsolutePath();
        websettings.setAppCachePath(appCachePath);
        websettings.setAllowFileAccess(true);    // Readable file cache
        websettings.setAppCacheEnabled(true);    //Turn on the H5(APPCache) caching function
        websettings.setJavaScriptEnabled(true);

        //alert가 작동하려면 아래 WebChromeClient 지정해야 함
        browser.setWebViewClient(new WebViewClient());
        browser.setWebChromeClient(new WebChromeClient());

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
