package com.nvisions.solutionsforaccessibility.CollapseExpand;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class CollapseExpandActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_collapse_expand);
setTitle(getString(R.string.collapseExpand));
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
Button example1 = (Button)findViewById(R.id.button1);
            example1.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.button1:
                Intent i = new Intent(getApplicationContext(), CollapseExpandExampleActivity.class);
                startActivity(i);
                break;
        }
    }
}

