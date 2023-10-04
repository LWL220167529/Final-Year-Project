package com.example.FYP.UI;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.WindowManager;

import com.example.FYP.R;

public class Menu extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Set the window attributes to make SecondActivity overlap FirstActivity
        getWindow().setFlags(
                WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
                WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS
        );
        setContentView(R.layout.activity_menu);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        finish();
    }
}