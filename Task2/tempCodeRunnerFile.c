import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class A {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int s = in.nextInt();
        int t = in.nextInt();
        int a = in.nextInt();
        int b = in.nextInt();
        int m = in.nextInt();
        int n = in.nextInt();
        int[] apple = new int[m];
        int app = 0;
        for(int appiii=0; appiii < m; appiii++){
            apple[appiii] = in.nextInt();
            if (a + apple[appiii] >= s && a + apple[appiii] <= t) {
                app++;
            }
        }
        int[] orange = new int[n];
        int or = 0;
        for(int orngii=0; orngii < n; orngii++){
            orange[orngii] = in.nextInt();
            if (b + orange[orngii] >= s && b + orange[orngii] <= t) {
                or++;
            }
        }
        
        System.out.println(app);
        System.out.println(or);
    }
}

