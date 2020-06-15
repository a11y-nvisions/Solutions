package com.nvisions.solutionsforaccessibility;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

public class ProgressBarActivity extends AppCompatActivity {
@Override
    protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_progress_bar);
    if (getActionBar() != null) {
        getActionBar().setDisplayHomeAsUpEnabled(true);
    }
    Button progressBarAccessibleExample = (Button)findViewById(R.id.progressBarAccessibleExample);
progressBarAccessibleExample.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        Intent intent = new Intent(getApplicationContext(), ProgressBarAccessibleExampleActivity.class);
        startActivity(intent);
    }
});
Button progressBarNoneAccessibleExample = (Button)findViewById(R.id.progressBarNoneAccessibleExample);
progressBarNoneAccessibleExample.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        Intent intent = new Intent(getApplicationContext(), ProgressBarNoneAccessibleExampleActivity.class);
        startActivity(intent);
    }
});
}
}

