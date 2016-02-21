package hooktest2;

import com.softsynth.jsyn.*;

import org.jnativehook.GlobalScreen;
import org.jnativehook.NativeHookException;
import org.jnativehook.mouse.NativeMouseEvent;
import org.jnativehook.mouse.NativeMouseInputListener;



public class GlobalMouseListenerExample implements NativeMouseInputListener {
	static int x;
	static int y;
	
	LineOut lineOut;
	
	SineOscillator sineOsc;

	SawtoothOscillator sawOsc;
	
    AddUnit mixer;

	public void init_synth(){
		Synth.startEngine(0);
    	lineOut = new LineOut();
    	sineOsc = new SineOscillator();
        sawOsc = new SawtoothOscillator();
        
        mixer = new AddUnit();
        
        sineOsc.output.connect( 0, mixer.inputA, 0 );
        sawOsc.output.connect(0, mixer.inputB, 0 );  // the lazy way
        
    	mixer.output.connect(0, lineOut.input, 0);
    	mixer.output.connect(0, lineOut.input, 1);

    	/*
    	sineOsc.output.connect(0, lineOut.input, 0);   // connect to left channel
    	sineOsc.output.connect( 0, lineOut.input, 1 );   // connect to right channel
    	
    	sawOsc.output.connect(0, lineOut.input, 0);   // connect to left channel
    	sawOsc.output.connect(0, lineOut.input, 1);   // connect to r channel
    	sineOsc.output.connect( 0, lineOut.input, 1 );   // connect to right channel
		*/

	}
	
    public void playstuff(int x, int y) {
        // Start the unit generators so they make sound.
        sawOsc.start();

        sineOsc.start();
        mixer.start();
        lineOut.start();       
        // Set the frequency of the oscillator to 200 Hz.
        //sineOsc.frequency.set( e.getX() );
        sineOsc.frequency.set( (x/3.0));
        sineOsc.amplitude.set( 0.8 );
        sawOsc.frequency.set( (400-y/3.0));
        sawOsc.amplitude.set( 0.1 );
        Synth.sleepForTicks( 200 );       
        // Stop units and delete them to reclaim their resources.
        /*
        sineOsc.stop();
        lineOut.stop();
        sineOsc.delete();
        lineOut.delete();       
        // Stop JSyn synthesizer.
        Synth.stopEngine();
        */
    }

    public void nativeMouseClicked(NativeMouseEvent e) {
        System.out.println("Mouse Clicked: " + e.getClickCount());
    }

    public void nativeMousePressed(NativeMouseEvent e) {
        System.out.println("Mouse Pressed: " + e.getButton());
    }

    public void nativeMouseReleased(NativeMouseEvent e) {
        System.out.println("Mouse Released: " + e.getButton());
    }

    public void nativeMouseMoved(NativeMouseEvent e) {


    	x = e.getX();
    	y = e.getY();
        System.out.println("Mouse Moved: " + e.getX() + ", " + e.getY());
    }

    public void nativeMouseDragged(NativeMouseEvent e) {
        System.out.println("Mouse Dragged: " + e.getX() + ", " + e.getY());
    }
    


    public static void main(String[] args) {
        try {
            GlobalScreen.registerNativeHook();
        }
        catch (NativeHookException ex) {
            System.err.println("There was a problem registering the native hook.");
            System.err.println(ex.getMessage());

            System.exit(1);
        }
        
        // Construct the example object.
        GlobalMouseListenerExample example = new GlobalMouseListenerExample();

        // Add the appropriate listeners.
        GlobalScreen.addNativeMouseListener(example);
        GlobalScreen.addNativeMouseMotionListener(example);
        example.init_synth();
        while(true){
            example.playstuff(x, y);
        	
        }
    }
}
