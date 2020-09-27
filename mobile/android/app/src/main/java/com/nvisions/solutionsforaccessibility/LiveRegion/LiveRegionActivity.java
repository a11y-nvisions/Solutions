package com.nvisions.solutionsforaccessibility.LiveRegion;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class LiveRegionActivity extends AppCompatActivity implements View.OnClickListener {

    private Button example1;
    private Button example2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_live_region);

        if(getActionBar() != null) {
            getActionBar().setDisplayHomeAsUpEnabled(true);
        }
        Button example1 = findViewById(R.id.example1);
        Button example2 = findViewById(R.id.example2);
        example1.setOnClickListener(this);
        example2.setOnClickListener(this);
    }
    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.example1:
                Intent i = new Intent(getApplicationContext(), LiveRegionExample1Activity.class);
                startActivity(i);
                break;
            case R.id.example2:
                Intent i2 = new Intent(getApplicationContext(), LiveRegionExample2Activity.class);
                startActivity(i2);
                break;
        }
    }
}

