package com.nvisions.solutionsforaccessibility.RatingBar

import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.MenuItem
import android.view.View
import android.widget.FrameLayout
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.nvisions.solutionsforaccessibility.R


class RatingBarBadActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.rating_bar_bad_activity)
        init()
    }

    fun init(){
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        setTitle(getString(R.string.ratingBar_bad))
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if(item.itemId == android.R.id.home){
            finish()
        }
        return super.onOptionsItemSelected(item)
    }
}



