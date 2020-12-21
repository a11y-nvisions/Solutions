package com.nvisions.solutionsforaccessibility.TabControl;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import com.google.android.material.tabs.TabLayout;
import com.nvisions.solutionsforaccessibility.R;

public class TabBadActivity extends AppCompatActivity {

    private Context mContext;
    private TabLayout mTabLayout;
    private ViewPager mViewPager;
    private ContentsPagerAdapter mContentsPagerAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tab_bad);
setTitle(getString(R.string.badExample));
        mContext = getApplicationContext();
        mTabLayout = (TabLayout) findViewById(R.id.layout_tab);
        TabLayout.Tab homeTab = mTabLayout.newTab().setCustomView(createTabView(getString(R.string.homeTab)));
        TabLayout.Tab gameTab = mTabLayout.newTab().setCustomView(createTabView(getString(R.string.gameTab)));
        TabLayout.Tab movieTab = mTabLayout.newTab().setCustomView(createTabView(getString(R.string.movieTab)));
        TabLayout.Tab bookTab = mTabLayout.newTab().setCustomView(createTabView(getString(R.string.bookTab)));
        TabLayout.Tab newsTab = mTabLayout.newTab().setCustomView(createTabView(getString(R.string.newsTab)));
        mTabLayout.addTab(homeTab);

        mTabLayout.addTab(gameTab);

        mTabLayout.addTab(movieTab);

        mTabLayout.addTab(bookTab);

        mTabLayout.addTab(newsTab);


        mViewPager = (ViewPager) findViewById(R.id.pager_content);
        mContentsPagerAdapter = new ContentsPagerAdapter(getSupportFragmentManager(), mTabLayout.getTabCount());
        mViewPager.setAdapter(mContentsPagerAdapter);

        mViewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(mTabLayout));

        mTabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
               mViewPager.setCurrentItem(tab.getPosition());
            }



            @Override

            public void onTabUnselected(TabLayout.Tab tab) {



            }



            @Override
            public void onTabReselected(TabLayout.Tab tab) {



            }

        });
    }

    private View createTabView(String tabName) {
        View tabView = LayoutInflater.from(mContext).inflate(R.layout.custom_tab, null);

        TextView txt_name = (TextView) tabView.findViewById(R.id.txt_name);

        txt_name.setText(tabName);
        return tabView;
    }
}


