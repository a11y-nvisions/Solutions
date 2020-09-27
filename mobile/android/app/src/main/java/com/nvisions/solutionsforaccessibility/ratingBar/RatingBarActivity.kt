package com.nvisions.solutionsforaccessibility.ratingBar

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import com.nvisions.solutionsforaccessibility.R
import kotlinx.android.synthetic.main.activity_rating_bar.*

class RatingBarActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_rating_bar)
        init()
    }
    
    fun init(){
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        setTitle(getString(R.string.main_ratingBar))

        //접근성 적용되지 않은 예시
        button1.setOnClickListener { 
            val intent = Intent(applicationContext, RatingBarBadActivity::class.java)
            startActivity(intent)
        }
        
        //접근성 적용된 예시
        button2.setOnClickListener {
            val intent = Intent(applicationContext, RatingBarGoodActivity::class.java)
            startActivity(intent)
        }
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if(item.itemId == android.R.id.home){
            finish()
        }
        return super.onOptionsItemSelected(item)
    }
}