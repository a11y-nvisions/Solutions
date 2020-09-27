package com.nvisions.solutionsforaccessibility.overlay;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.nvisions.solutionsforaccessibility.R;

import java.util.List;

/**
 * @author jeff
 */
public class MainListAdapter2 extends RecyclerView.Adapter<MainListAdapter2.MyViewHolder> {

    private final Context context;
    private final List<String> datas;

    public MainListAdapter2(Context context, List<String> datas) {
        this.context = context;
        this.datas = datas;
    }

    public class MyViewHolder extends RecyclerView.ViewHolder  {

        public MyViewHolder(View itemView) {
            super(itemView);
        }
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup viewGroup, int position) {
        View view = LayoutInflater.from(viewGroup.getContext()).inflate(R.layout.list_item_main2, viewGroup, false);
        MyViewHolder viewHolder = new MyViewHolder(view);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder viewHolder, int position) {

    }

    public List<String> getDatas() {
        return datas;
    }

    @Override
    public int getItemCount() {
        return 20;
    }

}

