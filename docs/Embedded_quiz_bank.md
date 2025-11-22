# Embedded quiz bank

##### Introduction to Embedded Systems

**Which of the following best defines an Embedded System (ES)?**

A general-purpose computer for various tasks.

A standalone software application.

A computing system dedicated to a specific task within a larger electrical system. 1

A system that only uses analogue electronics.



**Choose the programming language that is the lowest level.**

C

Fortran

Object

Assembly 1



**Which of the following is true about "hard real-time constraints"?**

Tasks have no deadlines.

Missed deadline can have extreme consequences. 1

A late response can degrade a system.

Typically non-critical systems.



**Which best describes the pattern that any embedded system should follow?**

input-output-process

process-input-output

process-output-input

input-process-output 1



**A Compiler ...**

translate source codes in 'C' language into object files 1

arranges all the '.c' files in the folder

is also called an Assembler.

translate source codes in 'C' language into an executable file.



**What type of real-time constraint describes a system where missing deadlines can have catastrophic consequences (e.g., an airbag controller)?**

Hard real-time 1

Non real-time

Soft real-time

Adaptive real-time



**Which of the following are properties of Embedded Systems?**

They often have strict timing constraints. 1
They interact with the real world using sensors and actuators. 1

They are dedicated to handle specific tasks. 1

They use abundant resources compared to general-purpose computers.



**Based on the lecture, which file(s) can be converted to an object file? (can be more than 1)**

c file 1

hex file

assembly file 1

decoded file



**A startup code typically**

initialize the Heap 1
reset all the memory

return to the main function

calls the main function 1

initialize the Stack 1



**Which of the following properties of embedded systems are true? (2 correct answers)**

Utilization of high memory and computing power

Microcontrollers are typically used rather than microprocessors 1

Necessity for strict timing constraints 1

Dedication to a wide range of tasks



**Which is the main characteristic of low-level language?**

Productivity

Very easy to understand

Compact and optimised 1

Do not need a compiler/assembler



**What is a "Heisenbug" as described in the context of the Therac-25 case study?**

A bug that is easy to reproduce and fix.
A bug caused by hardware malfunction.
A bug that disappears or changes behavior when observed or debugged. 1
A bug related to network communication.

A bug that explodes



**An Assembler ...**

does a one-to-one with a compiler

translations an assembly source file into an object file 1

optimizes the source code.

is also called a Compiler



**Which is/are the typical product development process?**

Testing

Deployment

Implementation

All of the above 1



**The Linker ...**

archives the data files into a single executable file

executes a file

loads the executable file to the memory for execution

combines one or more object files into a single executable file 1



**Which of these are properties of embedded systems?**

Able to handle certain timing constraints 1

Unlimited processing power

Based on microcontrollers 1

Infinite memory



**Which one is an intermediate file produced by the compiler?**

Objective file

Binary file

Object file 1

Objection file





##### Embedded C

**When monitoring a specific bit, for example, bit 5 of register P0, what expression creates a mask to target that bit?**

(P0 \& 5)

(5 << 1)

(P0 | 5)

(1 << 5) 1



**17 \&\& 23 = ?**

1 1

6

40

0



**To extract the upper 8 bits from a 16-bit data, what is the first recommended operation?**

Bitwise AND with 0xFF00 1
Logical AND with 0xFF00

Bitwise OR with 0x00FF

Right shift by 8 bits

Left shift by 8 bits



**Which of the following is False?**

Exponentiation (^) 1

Modulo (%)

Addition (+)

Division (/)



**Which data type is usually 4 bytes and primarily used for measuring things like weight, distance, or temperature on a Pico W.**

long double

double

char

float 1

int



**Performing a left shift operation on a number by N bits is equivalent to what arithmetic operation?**

Multiplying the number by 2 to the power of N 1

Multiplying the number by N

Dividing the number by N

Dividing the number by 2 to the power of N



**~0xEEE0 = ?**

0x1110

0x111F 1

0xFFFE

0x000F



**What is the typical size of a short int data type?**

8 bytes

4 bytes

2 bytes 1

1 byte



**Which operator is used to find the remainder of an integer division?**

\-

% 1

^

/

\*

\+



**How many bytes of memory does a char data type typically require in most C compilers?**

1 byte 1

4 bytes

2 bytes

8 bytes



**If you declare an array int arr\[5], what is the index of the last element?**

0

1

2

3

4 1

5



**How many different bitwise operators are there? (Assume its for Pico C SDK)**

1

2

3

4

5

6 1

7

8

9

too many to count



**What does the term "Data Type" primarily refer to in C programming?**

The name of a variable

The type of data a variable can hold 1

The size of a variable

The memory address of a variable



**The operator (!) is used for Bitwise Complement (Negation)?**

True

False 1



**In C, what numeric value represents TRUE in a conditional expression?**

-1 1

1 1

Any non-zero value 1

0



**If a register contains 0x06 and a left shift operation is performed by 1 position (0x06 << 1), what is the expected result?**

0x03

0x0E

0x0C 1

0x07



**Which type of variable retains its value between function calls and is stored in RAM?**

Volatile variable

Local variable

Static variable 1

Const variable



**Match the description to the operator**

\& Bitwise AND



\&\& Logical AND



| Bitwise OR



|| Logical OR







##### GPIO

**Which of the following communication bus tells an internal module to read or to write?**

Data bus

Address bus

CPU bus

Control bus 1



**An 8-bit GPIO port must be configured to have all 8 pins as "all output" or "all input"**

True

False 1



**GPIO pins always need to be used with an external resistor**

True

False 1



**17 \&\& 23 = ?**

1 1

FALSE

40

0

TRUE 1

6



**How is the specific function of a multiplexed pin typically selected on a microcontroller?**

It is hard-wired during manufacturing and cannot be changed

By physically rewiring the pin to a different internal circuit

Through software configuration, such as writing to function select registers 1

Automatically by the microcontroller based on the connected external device



**Why do modern microcontrollers often have "multiplexed" or "multi-function" pins?** 

To provide a redundant set of pins in case of hardware failure

To efficiently utilize a limited number of physical pins by allowing them to serve different functions under software control 1

To reduce power consumption by sharing tasks across multiple processors

To increase the overall clock speed of the microcontroller



**GPIO pins can support which of the following (without additional components):**

Analogue input and digital output
Digital input and output 1

Analogue output only

Analogue and digital input and output



**Most microcontrollers multiplex their GPIO pins with other functions**

True 1

False



**Regarding the direction of a General Purpose Input/Output (GPIO) pin, which statement is true?**

Pins can be changed between input and output modes, but not simultaneously 1

A single GPIO pin can simultaneously be configured as both an input and an output
A GPIO pin must be permanently set as either input or output during manufacturing

Input and output operations always occur on separate, dedicated pins 



**GPIO can be used to implement an SPI bus**

True 1

False



**In microcontrollers, GPIO stands for** 

General Public Input/Output

Global Purpose Input/Output

Global Public Input/Output

General Purpose Input/Output 1



**In which circumstance would it be better to NOT use GPIO pins to communicate with a peripheral:**

When the peripheral is read-only, and you can't write to it

When you can use a built-in bus like I2C or SPI 1

When the peripheral is a long distance away 1

When the peripheral specifies a very unusual custom interfacing protocol 1



**The internal memory map of a microcontroller tells the programmer**

When the programmer can save and load files from

How to get a signal from an input pin to an output pin

The current amount of free RAM space in the device

The location of registers in memory 1



**A multiplex matrix is used to connect buttons to a microcontroller because**

It saves on the number of pins needed 1

The layout of the QWERTY keys means you must use a matrix

It allows LEDs to display when a key is pressed

It is a safe way to debounce input signals



**17 \&\& 0 = ?**

17

0 1

-17

TRUE

1

FALSE 1



##### Digital Communication

**Half-duplex transmission between unit A and unit B is where**

Units A and B take turns to transmit 1

Units A and B transmit at the same time

Unit A sends half of the data, then unit B sends the other half

Only Unit A can transmit, Unit B can only receive



**A 7-bit ascii data is transmitted with 1 start bit, 1 stop bit and 1 parity bit at a baud rate of 9600. How fast is the 7-bit ascii data being transmitted?**

0.115 ms

1.042 ms 1

0.104 ms

1.146 ms



**Which digital communication protocol is asynchronous?**

UART 1

SPI

I2C

All of them.



**We need to provide slave address for UART communication protocol.**

True

False 1



**A synchronous communications link has a separate clock wire**

True 1

False



**The I2C protocol has separate wires for transmit and receive (called MOSI and MISO)**

True

False 1



**An SPI master can only have one slave**

True

False 1



**In EIA/RS-232, what indicates that a character is about to be transmitted**

A start bit 1

The chip select (CS) line

The header is transmitted first

Transmit indicator wire



**How is data transmitted onto the serial console?**

One byte at a time 1

One word at a time

One string at a time

One sentence at a time



**Using a single parity bit when transmitting a 7-bit character over EIA/RS-232, you can**

Detect when 2 or 4 bits are received in error

Detect when 1 or 3 bits are received in error 1

Correct an error of 1 bit in the received character

Indicate to the transmitter that it must re-send the character



##### Interrupts

**ISR code should ideally be**

small and efficient 1

written in a high level language

written with a proper user interface

only executed at boot time



**What is the purpose of an interrupt vector table (IVT)?**

To store code that prevents interrupts from happening

To hold the address of ISRs which can handle interrupts 1

The store the code that causes interrupts to happen

To store the ISR code for handling different interrupts



**Level-triggered interrupts can be falling or rising edge.**

True

False 1



**A CPU can \_\_\_ data onto a stack and later it must \_\_\_ it off again**

push 

pop



**The watchdog timer (WDT) is designed to restart a system if the software crashes**

True 

False 1



**Why should you only clear the interrupt flag before exiting an ISR?**

To prevent the ISR immediately re-running 1

To tidy up the stack before you leave

To tell the user that the code has ended

Because ISRs cannot use global variables



**The SP is**

a stack placeholder the programmer uses to remember where the stack is in memory

a register that indicates the end of the stack 1

the "stack push" indicator

a variable that contains data for a short time



**If an event is happening with a very short durations in-between 2 given occurrences. Which is the best choice to take? (Assume we don't care about the power consumption)** 

Masking

Interrupts 1

Nested Interrupts

Polling 



**An RTC crystal or oscillator allows a CPU to**

Generate its main system clock

Connect to peripherals that also have an RTC

Improve the timing of its ISRs

Provide a signal that can be exactly divided into 1 second 1



**An interrupt is always a bad thing for a CPU**

True

False 1



**In the lecture, we defined the utilisation for an interrupt as u = (h+c)/T. In general, utilisation is the percentage of time when the processor is busy and h is the timing overhead for handling the interrupt. Suppose the inter-arrival time between two events is 500 cycles and the processor needs 18 cycles for either a pop or a push. For an ISR which requires 20 cycles for completion, what is its utilisation?**

7.6

11.6

11.2 1

4



**Inside a microprocessor, a "timer" is** 

A built-in clock unit

A counter that can run down or up 1

An ISR that is triggered by the RTC

Software that implements a stopwatch function



**Interrupts are usually really simple to debug**

True

False 1



##### Timers \& PWM

**The count-down timer free-running mode means**

Counter wraps back around to 0 after hitting a maximum value

Counter counts down to 0 then begins counting up

Counter wraps back around to maximum after counting down to 0 1

Counter counts down from maximum to 0 and then stops automatically



**CPU can execute other code while the timer is running concurrently.**

True 1

False



**Inside a microcontroller, a "timer" is a/an ...**

counter that can run down or up. 1

ISR that is triggered by the RTC

built-in clock unit.

software that implements a stopwatch function.



**A 1Hz clock is**

generated using a crystal that emits a signal at 32.768kHz 1

generated using a counter that counts till 2^15  1

directly used as the main clock

used by the Real Time Clock 1



**Which meets the below conditions?**

**1. Counter wraps around to the maximum value after counting down to zero.**

**2. Flag/Interrupt set when the counter wraps around 1st clock edge after zero.**

One-shot Mode

Continuous Mode

Periodic Timer Mode

Free Running Mode 1



**A \_\_\_ count is used to obtain a 1 second timer from a 30MHz clock? (enter numerical answer)**

30000000 



**The watchdog timer (WDT) is designed to restart a system if the software crashes**

True 1

False



**'A' is one cycle, 'B' is the high. 'A' must be \_\_\_ to make a 40% duty-cycle, if 'B' is 30ms. (ensure you include the units too)**

75ms



##### ADC

**If an input signal to an ADC raises slightly above Vref, then it is**

Ignored until the voltage drops below Vref

Destroyed

Clipped 1

Measured as a 0



**A transducer**

Is a digital device used to measure voltage

Converts a signal from one form into another 1

Channels the energy emitted by the Tesseract 

Always crosses between analogue and digital domains 



**Quantization process is generally \_\_\_\_\_\_\_\_\_\_ and results in information \_\_\_\_\_\_\_\_\_\_ .**

irreversible, loss 1

reversible, loss

irreversible, gain

reversible, gain



**A signal that ranges from 0v to 3.3v is fed into a 7-bit ADC.  What is the representation of sampled analog voltage of 0.12V? (Assume the error is between 0 to 1 least significant bit)**

0x12

001 0010b

000 0110b

0x04 1



**When referring to an ADC, quantisation means**

The sample rate at which a sample is converted to digital

The sample is converted to analogue by a DAC

The biggest (maximum) value that the sample can reach

The number of discrete levels used to represent a sample 1



**An ADC should quantise a continuous signal differently to how it quantises a single value.** 

True

False 1



**Select which of the following occurs within an ADC (tick all that apply):**

Transduction

Quantisation 1

Sampling 1

Inversion



**Nyquist's theorem states that perfect reconstruction may be possible if the signal is sampled how fast?**

As fast as the ADC can sample

With at least 2x as many bits as the signal should have

At least 2x faster than the highest frequency component 1

At least 48kHz



**What is the typical sample rate and data size of a CD-quality audio signal?**

8-bits and 48kHz

20-bits and 24kHz

44.1kHz and 16-bits 1

256kHz and 32-bits



##### Embedded Operating System

**Which of these characteristics of Monolithic Kernel is false?**

Hard to extend its functionality

Fast Execution 

Both user services and kernel services are kept in the same address space

A service crash does not crash the whole system 1



**A task is the smallest sequence of instructions that can be managed independently by an/a ....**

scheduler 1

inter-process communication (IPC)

task control block (TCB)

interrupt



**If a task calls the following function, it will always be placed into a "blocked" state for 250ms: vTaskDelay(250);**

True

False 1

 

**Which of the following statement is true based on the following code snippet?**

**xTaskCreate(avg\_task, "AvgThread", configMINIMAL\_STACK\_SIZE, NULL, TEST\_TASK\_PRIORITY, NULL);**

**xTaskCreate(simpleaverage, "TempThread", configMINIMAL\_STACK\_SIZE, NULL, TEST\_TASK\_PRIORITY, NULL);**

**xTaskCreate(printfunction, "AvgThread", configMINIMAL\_STACK\_SIZE, NULL, TEST\_TASK\_PRIORITY, \&printtask);**



Priority-based scheduling will occur 

Round-robin scheduling will occur 1

The program will crash at the instruction: "for( ; ; )"

The program will crash at the instruction: "vTaskStartScheduler()"



**Task functions typically do not call "return()"**

True 1

False



**In FreeRTOS, the lowest priority interrupt (ISR) will interrupt the highest priority task.**

True 1

False



**Which Priority Driven Scheduling Algorithm is dynamic-priority based?**

Deadline Monotonic Scheduling (DMS)

Rate Monotonic Scheduling (RMS)

Earliest Deadline First (EDF) 1

Least Slack Time (LST) 1



**Which service/feature is the most important for multi-tasking to work in an EOS?**

inter-process communication

polling

context switch 1

memory management



**Which of the following are considerations when selecting an RTOS? \[Select 2]**

Machine Learning

Decompilers

Debuggers 1

Features 1



**Which Task State occurs the least amount of time?**

Terminated 1

Running

Ready

Blocked



##### TESTING

**JTAG can support which of the following (select all that apply):**

Simulate code running in a virtual sandbox

Examine the contents of memory and program FLASH 1

Debug the CPU as well as internal peripherals 1

Allow single-stepping, breakpoints and watchpoints 1



**In embedded systems, what does "real-time testing" refer to?**

Testing conducted by real users

Testing conducted under laboratory conditions

Testing conducted using real hardware components

Testing that assesses the system's ability to respond within a specific time frame 1



**What is the primary goal of regression testing in embedded systems?**

To ensure that new changes do not introduce defects into existing functionality 1

To test new features and functionality

To identify and fix security vulnerabilities

To validate hardware components



**What is the purpose of boundary value analysis in embedded software testing?**

To assess system security

To test the system's user interface

To check how the system handles extreme inputs 1

To validate hardware components



**Choose the statement that is false for hardware-based debuggers like JTAG.**

Breakpoint by replacing an instruction in memory with a trap 1

Ability to observe software execution in real time

Memory and I/O ports are accessible while running

Communicates with the debugging computer



**For black box testing a unit under test (UUT), which of the following is true?**

The test should contain all possible input values

The UUE internal behaviour is not a concern 1

Test values should be designed to match the code inside the UUE

The UUE  internal behaviour needs to be examined



**What does "Firmware" refer to in the context of embedded systems?**

Software that controls hardware devices 1

Hardware components of the system

User interface elements

Networking protocols



**Which debugging technique would be the most appropriate for an ISR (interrupt sub routine)?**

hardware breakpoints 1

LED monitoring

print statement

software breakpoints



**Which testing technique focuses on testing the interactions between various software modules or components?**

Stress testing

System testing

Integration testing 1

Unit testing



**What is the purpose of black-box testing in embedded systems?**

Testing hardware components

None of the above

Testing the internal structure of the software

Testing the functionality of the software without knowledge of its internal implementation 1



**Which type of testing focuses on verifying the functionality of individual software modules or components?**

System testing

Regression testing

Unit testing 1

Integration testing 



**What is the primary goal of code coverage analysis in embedded software testing?**

Measuring the efficiency of code execution

Assessing system performance

Evaluating the completeness of test cases 1

Analyzing hardware components



**Which statement about coding errors is true for a typical software project**

You can't find all defects, no matter what 1

Careful testing is needed to remove all errors

Good programmers don't write code with errors

Good software engineering practices mean no errors in code



**Which testing phase involves testing the entire embedded system as a whole?**

Performance testing

Unit testing

Integration testing

System testing 1



**Sort the following technique from the least intrusive (#1) to the most intrusive (#4).**

Print statements 4

Hardware Breakpoints 2

Desk-checking 1

LED monitoring 3



**Test cases contain a definition of which of the following (select all that apply):**

Wanted output 1

Expected behaviour 1

Only correct input values

Actual behaviour



**Which aspect is the MOST important when performing debugging? (Select 2)**

intrusiveness 1

stabilization 1

optimization

performance



**Which testing technique involves feeding predefined inputs into the system and comparing the actual outputs with expected outputs?**

White-box testing

Stress testing

Systems testing

Black-box testing 1



**Boundary scan testing inside a microcontroller**

Controls the CPU alone

Can intercept signals between CPU and external pins 1

Only controls the state of the external pins

Is a parallel, asynchronous test bus for the internal CPU



**Which techniques are the most appropriate tool for measuring the timing of an interrupt. \[choose 2]**

Hardware timer unit 1

API to call the OS Clock

printf Statements

GPIO + Oscilloscope 1



##### Optimise

**Select the three main classification for optimization in embedded systems.**

Power 1

Performance 1

Compiler

Memory 1



**Which of the following will be affected by different software.**

static leakage

dynamic power consumption 1

static power consumption

high clock frequency



**Which of the following are optimization techniques for performance? (select four correct answer)**

Functions calling conventions 1

Choosing the right data types 1

Hardware loops 1

Assembly inlining 1



**What is the immediate purpose of a shunt resistor?**

to profile an application

to measure current flow

to measure voltage drop 1

to measure power consumption



**Loop unrolling can work on dynamic number of iterations.**

True

False 1



**A program running on a microcontroller without hardware multiplication support needs to compute the following result:**

**X=A×2+B×C**

**Several students proposed different implementations that give the same mathematical result. Which of the following versions would likely execute the fastest on this MCU? (Select all that apply.)**

X = (A << 1) + (B \* C) 1

X = (A \* 2) + (C \* B)

X = (A \* 2) + (B \* C)

X = A + A + (B \* C) 1

X = (A + A) + (B \* C) 1



**Select two methods that helps in minimizing power consumption.**

loop unrolling

clock scaling 1

application scaling

voltage scaling 1



**A 100% CPU utilisation will give a  \_\_\_\_\_\_\_\_  power usage.**

average

typical

worst-case 1

maximum



**Floating point operations are encouraged in embedded systems.**

True

False 1





##### Sensor Fusion

**What is the primary advantage of distributed sensor fusion over centralized fusion?**

Simpler system design

Lower transmission bandwidth and faster computation 1

Higher accuracy

No need for synchronization



**Select the statement that is true for the logic interface for these devices.**

IMAGE

Both these devices cannot 'talk' to each other.

"Raspberry Pi GPIO" can be an Output and "Sensor Pin" can be an Input

"Raspberry Pi GPIO" can be an Input and "Sensor Pin" can be an Output

Both "Raspberry Pi GPIO" and "Sensor Pin" can be an Input and Output 1



**A \_\_\_\_\_\_\_\_\_\_ is a device that converts energy from one form to another. Usually a \_\_\_\_\_\_\_\_\_\_ converts a signal in one form of energy to a signal in another. (Choose the best answer)**

convertor, transducer

transducer, transducer 1

thermophile, thermometer

transformer, transducer



**Raspberry Pi's GPIO pins can support which of the following:**

Analogue output only

Digital input and output 1

Analogue input and digital output

Analogue and digital input and output



**In the context of preprocessing sensor data, which method is best suited for estimating future values based on current and past readings?**

Smoothing

Kalman filter 1

Averaging

All of them

Filtering



**A typical sensor will perform signal conditioning before sending out the signal in a digital format. Which of the following does not occur within a sensor module?**

Amplification

Analog-to-Digital Convertor

Control logic

Digital-to-Analog Convertor 1



**What is the main function of an actuator in an embedded system?**

To amplify sensor signals 

To sense environmental changes

To convert a control signal into a physical action 1

To digitize analog signals



**Which of the following is not part of a Servo Motor (e.g. SG90)?**

inductor 1

potentiometer

microcontroller

motor



**A sensor is a device that receives a stimulus and responds with an electrical signal. Electrical here mean a signal that can be channeled, amplified, and modified by electronic devices. Which of the following is NOT a type of response that the microcontroller can handle?**

Power

Charge

Acceleration 1

Induction



**Which of the following is NOT a stimulus.**

Sound

Contempt 1

Pressure

Displacement



Which if the following is not typically used to detect change in a sensor?

IMAGE

Material of conductive plates 1

Material of dielectric

Area of conductive plates

Distance between conductive plates



**In the context of sensor fusion by competition level, which scenario best exemplifies "coordinated fusion"?**

Combining radar and LiDAR to detect the same object

Using two cameras placed apart to estimate depth via stereo vision 1

Using two temperature sensors to cross-check room temperature 

Merging GPS and accelerometer data for position estimation



**The following sensor uses capacitance to detect water level. Which change in factor are we trying to detect?**

IMAGE

Material of conductive plates 

Distance between conductive plates

Area of conductive plates 1

Distance between Dielectric



