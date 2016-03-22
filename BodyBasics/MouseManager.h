#ifndef MOUSE_MANAGER_H
#define MOUSE_MANAGER_H

#include <Windows.h>

class MouseManager
{
private:
	enum class Mouse_state {
		MOUSE_DOWN, MOUSE_UP
	} mouse_state;
	enum class Tracking_state {
		Idle, Close_one, Open_one, Close_two
	} tracking_state;
	enum class Position_state {
		Head, Hand
	} position_state;

	//tick
	DWORD tick;
	bool is_attach;
	void set_default();
	void start_timer();
	bool within_time_interval();
	void press_mouse();
	void release_mouse();

public:
	MouseManager();
	~MouseManager();
	void hand_open();
	void hand_close();
	void detach();
	void attach();
	void keyboard_interrupt();
	void set_pos_hand(LONG x, LONG y);
	void set_pos_head(LONG x, LONG y);
};

#endif

