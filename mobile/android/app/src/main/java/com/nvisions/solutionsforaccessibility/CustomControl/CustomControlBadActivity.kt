package com.nvisions.solutionsforaccessibility.CustomControl

import android.os.Bundle
import android.os.Handler
import android.view.MenuItem
import android.view.accessibility.AccessibilityManager
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import com.nvisions.solutionsforaccessibility.R
import kotlinx.android.synthetic.main.custom_control_bad_activity.*
import java.util.*
import kotlin.concurrent.timer

class CustomControlBadActivity : AppCompatActivity() {
    private var count:String = "1"
    private var type:String = "단품"
    private val pagerList = arrayListOf("맥도날드", "롯데리아", "KFC")
    private var currentPage = 0
    lateinit var timer: Timer

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.custom_control_bad_activity)


        init()
    }

    fun init(){
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
        setTitle(getString(R.string.customControl_bad))
        initAdapter()
        initListener()
        initTimer()
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        if(item.itemId == android.R.id.home){
            finish()
        }
        return super.onOptionsItemSelected(item)
    }


    private fun initAdapter(){
        val adapter = ViewPagerAdapter(this, pagerList)
        viewPager.adapter = adapter
    }

    private fun initListener(){
        buttonDown.setOnClickListener {
            val num = Integer.parseInt(editText.text.toString()) - 1
            editText.setText(num.toString())
            if(num == 1){
                buttonDown.isEnabled = false
            }
        }
        buttonUp.setOnClickListener {
            val num = Integer.parseInt(editText.text.toString()) + 1
            editText.setText(num.toString())
            if(num == 2){
                buttonDown.isEnabled = true
            }
        }

        swipeButton.setOnStateChangeListener{
            count = editText.text.toString()
            type = ""
            when(radioButton.getStateSelected()){
                1 -> {//단품
                    type = getString(R.string.customControl_radio_single)
                }
                2 -> {//세트
                    type = getString(R.string.customControl_radio_set)
                }
            }
            val str = "햄버거 " + count + "개 " + type + " 주문 완료"
            Toast.makeText(applicationContext, str, Toast.LENGTH_LONG).show()
            val builder = AlertDialog.Builder(this)
            builder.setMessage(str)
            builder.setPositiveButton(R.string.confirm) { _, _->
                count = "1"
                type = getString(R.string.customControl_radio_single)
                editText.setText("1")
                radioButton.setStateSelected(1)
                buttonDown.isEnabled = false
            }
            builder.create().show()
        }



    }

    private fun initTimer(){
        val handler = Handler()
        val update = Runnable {
            if (currentPage == 3) {
                currentPage = 0
            }
            viewPager.setCurrentItem(currentPage++, true)
        }

        timer = timer(period = 5000){
            handler.post(update)
        }
    }



}