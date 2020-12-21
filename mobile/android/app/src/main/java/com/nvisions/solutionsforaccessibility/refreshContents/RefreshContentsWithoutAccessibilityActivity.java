package com.nvisions.solutionsforaccessibility.refreshContents;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListAdapter;
import android.widget.ListView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.nvisions.solutionsforaccessibility.R;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RefreshContentsWithoutAccessibilityActivity extends AppCompatActivity {

    SwipeRefreshLayout mSwipeRefreshLayout;
    ListView mListView;
    List mArrayList = new ArrayList<>();
    private int mRefreshCount=0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_refresh_contents_without_accessibility);
        setTitle(getString(R.string.badExample));
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        mSwipeRefreshLayout = findViewById(R.id.swipeRefresh);
        mSwipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                refreshList();
            }
        });
        mListView = findViewById(android.R.id.list);
        mListView.setEnabled(false);
        final String[] countries = new String[]{"China", "France", "Germany", "India",
                "Russia", "United Kingdom", "United States"};
        mArrayList = new ArrayList<>(Arrays.asList(countries));
        ListAdapter countryAdapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1, mArrayList);
                mListView.setAdapter(countryAdapter);
                    }

    private void refreshList() {
        mRefreshCount++;
        mArrayList.add(getString(R.string.refreshed) + mRefreshCount);
        ListAdapter countryAdapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1, mArrayList);
        mListView.setAdapter(countryAdapter);
                mSwipeRefreshLayout.setRefreshing(false);
    }
}

