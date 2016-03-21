#include "MouseManager.h"

#include <Windows.h>

MouseManager::MouseManager()
{
	set_default();
	is_attach = true;
}

MouseManager::~MouseManager()
{
}

void MouseManager::set_pos_hand(LONG x, LONG y) {

	if (!is_attach)
		return;

	if (position_state == Position_state::Head)
		return;

	SetCursorPos(x, y);
}

void MouseManager::set_pos_head(LONG x, LONG y) {

	if (!is_attach)
		return;

	if (position_state == Position_state::Hand)
		return;
	SetCursorPos(x, y);
}

void MouseManager::hand_open() {
	if (!is_attach)
		return;

	if (position_state == Position_state::Hand) {
		release_mouse();
		return;
	}

	switch (tracking_state) {
	case Tracking_state::Idle:
		break;
	case Tracking_state::Close_one:
	{
		if (!within_time_interval()) {
			tracking_state = Tracking_state::Idle;
		}
		else {
			start_timer();
			tracking_state = Tracking_state::Open_one;
		}
		break;
	}
	case Tracking_state::Open_one:
	{
		if (!within_time_interval()) {
			tracking_state = Tracking_state::Idle;
		}
		break;
	}
	case Tracking_state::Close_two:
	{
		if (!within_time_interval()) {
			tracking_state = Tracking_state::Idle;
		}
		else {
			tracking_state = Tracking_state::Idle;
			position_state = position_state == Position_state::Hand ? Position_state::Head : Position_state::Hand;
		}
		break;
	}
	}
}

void MouseManager::hand_close() {
	if (!is_attach)
		return;

	if (position_state == Position_state::Hand) {
		press_mouse();
		return;
	}

	switch (tracking_state) {
	case Tracking_state::Idle:
	{
		start_timer();
		tracking_state = Tracking_state::Close_one;
		break;
	}
	case Tracking_state::Close_two:
	case Tracking_state::Close_one:
	{

		if (!within_time_interval()) {
			tracking_state = Tracking_state::Idle;
		}
		break;
	}
	case Tracking_state::Open_one:
	{
		if (!within_time_interval()) {
			tracking_state = Tracking_state::Idle;
		}
		else {
			tracking_state = Tracking_state::Close_two;
			start_timer();
		}
		break;
	}
	}
}

void MouseManager::keyboard_interrupt() {
	if (!is_attach)
		return;
	set_default();
}

void MouseManager::attach() {
	if (is_attach)
		return;

	set_default();
	is_attach = true;
}

void MouseManager::detach() {
	if (!is_attach)
		return;

	set_default();
	is_attach = false;
}

void MouseManager::set_default() {
	mouse_state = Mouse_state::MOUSE_UP;
	tracking_state = Tracking_state::Idle;
	position_state = Position_state::Head;
	release_mouse();
}


void MouseManager::start_timer() {
	tick = GetTickCount();
}

bool MouseManager::within_time_interval() {
	DWORD current_time = GetTickCount();
	DWORD time_diff = current_time - tick;
	return time_diff < 1000;
}

void MouseManager::press_mouse() {
	if (mouse_state == Mouse_state::MOUSE_DOWN)
		return;

	mouse_state = Mouse_state::MOUSE_DOWN;

	POINT mouse_pos;
	GetCursorPos(&mouse_pos);

	MOUSEINPUT mouse_input;
	mouse_input.dx = mouse_pos.x;
	mouse_input.dy = mouse_pos.y;
	mouse_input.dwFlags = MOUSEEVENTF_LEFTDOWN;
	mouse_input.mouseData = XBUTTON1;
	mouse_input.dwExtraInfo = 0;
	mouse_input.time = 0;

	INPUT input;
	input.type = INPUT_MOUSE;
	input.mi = mouse_input;

	SendInput(1, &input, sizeof(input));
}

void MouseManager::release_mouse() {
	if (mouse_state == Mouse_state::MOUSE_UP)
		return;

	mouse_state = Mouse_state::MOUSE_UP;

	POINT mouse_pos;
	GetCursorPos(&mouse_pos);

	MOUSEINPUT mouse_input;
	mouse_input.dx = mouse_pos.x;
	mouse_input.dy = mouse_pos.y;
	mouse_input.dwFlags = MOUSEEVENTF_LEFTUP;
	mouse_input.mouseData = XBUTTON1;
	mouse_input.dwExtraInfo = 0;
	mouse_input.time = 0;

	INPUT input;
	input.type = INPUT_MOUSE;
	input.mi = mouse_input;

	SendInput(1, &input, sizeof(input));
}

