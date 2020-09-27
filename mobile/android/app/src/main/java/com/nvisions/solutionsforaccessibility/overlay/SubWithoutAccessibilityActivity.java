package com.nvisions.solutionsforaccessibility.overlay;

import android.os.Bundle;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.nvisions.solutionsforaccessibility.R;

public class SubWithoutAccessibilityActivity extends AppCompatActivity {

    private int screenMode;
    private final int SCREEN_MAIN = 0;
    private final int SCREEN_SEARCH = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sub_without_accessibility);
        setTitle(getString(R.string.badExample));
        getSupportActionBar().hide();
        showMainScreen();
    }

    private void showMainScreen() {
        screenMode = SCREEN_MAIN;
        makeMainList();
    }

    private void makeMainList() {
        RecyclerView recyclerView = findViewById(R.id.main_list);
        LinearLayoutManager recyclerViewLayoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(recyclerViewLayoutManager);
        MainListAdapter adapter = new MainListAdapter(this, null);
        recyclerView.setAdapter(adapter);
    }

    public void showSearchScreen(View view) {
        screenMode = SCREEN_SEARCH;
        setSearchScreenVisible();
        makeSearchList();
    }

    private void setSearchScreenVisible() {
        ConstraintLayout searchScreen = findViewById(R.id.search_screen);
        searchScreen.setVisibility(View.VISIBLE);
    }



    private void makeSearchList() {
        RecyclerView recyclerView = findViewById(R.id.search_list);
        LinearLayoutManager recyclerViewLayoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(recyclerViewLayoutManager);
        SearchListAdapter adapter = new SearchListAdapter(this, null);
        recyclerView.setAdapter(adapter);
    }

    public void goBackMain(View view) {
        hideSearchScreen();
        screenMode = SCREEN_MAIN;
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
}

