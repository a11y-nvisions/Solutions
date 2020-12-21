package com.nvisions.solutionsforaccessibility.TabControl;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentStatePagerAdapter;

public class ContentsPagerAdapter extends FragmentStatePagerAdapter {

    private int mPageCount;



    public ContentsPagerAdapter(FragmentManager fm, int pageCount) {

        super(fm);

        this.mPageCount = pageCount;

    }



    @Override

    public Fragment getItem(int position) {

        switch (position) {

            case 0:

                HomeFragment homeFragment = new HomeFragment();

                return homeFragment;



            case 1:

                GameFragment gameFragment = new GameFragment();

                return gameFragment;



            case 2:

                MovieFragment movieFragment = new MovieFragment();

                return movieFragment;



            case 3:

                BookFragment bookFragment = new BookFragment();

                return bookFragment;



            case 4:

                NewsFragment newsFragment = new NewsFragment();

                return newsFragment;



            default:

                return null;

        }

    }



    @Override

    public int getCount() {

        return mPageCount;

    }

}

