package com.nvisions.solutionsforaccessibility.CustomControl

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import com.nvisions.solutionsforaccessibility.R
import com.nvisions.solutionsforaccessibility.RatingBar.RatingBarBadActivity
import com.nvisions.solutionsforaccessibility.RatingBar.RatingBarGoodActivity
import kotlinx.android.synthetic.main.rating_bar_activity.*

class CustomControlActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.custom_control_activity)
        init()
    }

    fun init(){
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        setTitle(getString(R.string.customControl_main))


        button1.setOnClickListener {
            val intent = Intent(applicationContext, CustomControlBadActivity::class.java)
            startActivity(intent)
        }

        //접근성 적용된 예시
        button2.setOnClickListener {
            val intent = Intent(applicationContext, CustomControlGoodActivity::class.java)
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