package com.nvisions.solutionsforaccessibility.overlay;

import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.nvisions.solutionsforaccessibility.R;

public class SubWithAccessibilityActivity extends AppCompatActivity {

    private int screenMode;
    private final int SCREEN_MAIN = 0;
    private final int SCREEN_SEARCH = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sub_with_accessibility);
        getSupportActionBar().hide();
        showMainScreen();
    }

    private void showMainScreen() {
        screenMode = SCREEN_MAIN;
        setMainScreenVisible();
        makeMainList();

    }

    private void setMainScreenVisible() {
        ConstraintLayout mainScreen = findViewById(R.id.main_screen);
        mainScreen.setVisibility(View.VISIBLE);
    }

    private void makeMainList() {
        RecyclerView recyclerView = findViewById(R.id.main_list);
        LinearLayoutManager recyclerViewLayoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(recyclerViewLayoutManager);
        MainListAdapter2 adapter = new MainListAdapter2(this, null);
        recyclerView.setAdapter(adapter);
    }

    public void showSearchScreen(View view) {
        screenMode = SCREEN_SEARCH;
        setSearchScreenVisible();
        hideMainScreen();
        makeSearchList();
    }

    private void hideMainScreen() {
        ConstraintLayout mainScreen = findViewById(R.id.main_screen);
        mainScreen.setVisibility(View.GONE);
    }

    private void setSearchScreenVisible() {
        ConstraintLayout searchScreen = findViewById(R.id.search_screen);
        searchScreen.setVisibility(View.VISIBLE);
    }

    private void makeSearchList() {
        RecyclerView recyclerView = findViewById(R.id.search_list);
        LinearLayoutManager recyclerViewLayoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(recyclerViewLayoutManager);
        SearchListAdapter2 adapter = new SearchListAdapter2(this, null);
        recyclerView.setAdapter(adapter);
    }

    public void goBackMain(View view) {
        hideSearchScreen();
        showMainScreen();
    }

    private void hideSearchScreen() {
        ConstraintLayout searchScreen = findViewById(R.id.search_screen);
        searchScreen.setVisibility(View.GONE);
    }

    @Override
    public void onBackPressed() {
        if (screenMode == SCREEN_MAIN) {
            super.onBackPressed();
        } else if (screenMode == SCREEN_SEARCH) {
            showMainScreen();
        }
    }

    public void showMenu(View view) {
    }

    public void handleMainTitleClick(View view) {
    }

    private void speakAccessibilityAnnouncement(final String text) {
//        new Handler().postDelayed(new Runnable() {
//            @Override
//            public void run() {
//                AccessibilityManager accessibilityManager = (AccessibilityManager) getSystemService(Context.ACCESSIBILITY_SERVICE);
//                AccessibilityEvent accessibilityEvent = AccessibilityEvent.obtain();
//                accessibilityEvent.setEventType(AccessibilityEvent.TYPE_ANNOUNCEMENT);
//
//                accessibilityEvent.getText().add(text);
//                if (accessibilityManager != null) {
//                    accessibilityManager.sendAccessibilityEvent(accessibilityEvent);
//                }
//
//            }
//        }, 1000);
    }
}

