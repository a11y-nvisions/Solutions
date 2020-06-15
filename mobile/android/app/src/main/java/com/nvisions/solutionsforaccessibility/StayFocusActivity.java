package com.nvisions.solutionsforaccessibility;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

public class StayFocusActivity extends AppCompatActivity  implements View.OnClickListener {
    private Button example1;
    private Button example2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_stay_focus);

        if(getActionBar() != null) {
            getActionBar().setDisplayHomeAsUpEnabled(true);
        }
        Button example1 = findViewById(R.id.example1);

        example1.setOnClickListener(this);

    }
    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.example1:
                Intent i = new Intent(getApplicationContext(), RecyclerViewFocusActivity.class);
                startActivity(i);
                break;
        }
    }

}

