package com.nvisions.solutionsforaccessibility.music;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.nvisions.solutionsforaccessibility.R;

public class MusicActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_music);

        if(getActionBar() != null) {
            getActionBar().setDisplayHomeAsUpEnabled(true);
        }
Button example1 = (Button)findViewById(R.id.example1);
    Button example2 = (Button)findViewById(R.id.example2);
        example1.setOnClickListener(this);
        example2.setOnClickListener(this);
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.example1:
                Intent i = new Intent(getApplicationContext(), MusicGoodActivity.class);
                startActivity(i);
                break;
            case R.id.example2:
                Intent i2 = new Intent(getApplicationContext(), MusicBadActivity.class);
                startActivity(i2);
                break;
        }
    }

}

