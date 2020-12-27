package com.nvisions.solutionsforaccessibility.LayerFocus

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.view.ViewGroup
import com.nvisions.solutionsforaccessibility.R
import kotlinx.android.synthetic.main.activity_layer_focus.*

class LayerFocusActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_layer_focus)
        init()
    }

    fun init(){
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        setTitle(getString(R.string.newLayerName))

        button1.setOnClickListener {
            val intent = Intent(applicationContext, LayerFocusBadActivity::class.java)
            startActivity(intent)
        }

        //접근성 적용된 예시
        button2.setOnClickListener {
            val intent = Intent(applicationContext, LayerFocusGoodActivity::class.java)
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