package com.nvisions.solutionsforaccessibility.NestedScroll;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class NestedScrollActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_nested_scroll);
setTitle(getString(R.string.nestedScroll));
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
Button example1 = (Button)findViewById(R.id.button1);
            example1.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.button1:
                Intent i = new Intent(getApplicationContext(), NestedScrollExampleActivity.class);
                startActivity(i);
                break;
        }
    }
}

