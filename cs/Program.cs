using System;

namespace FinalFoundation
{
    // Base class Animal
    public class Animal
    {
        // Common property
        public string Name { get; set; }

        // Constructor
        public Animal(string name)
        {
            Name = name;
        }

        // Virtual method for making a sound, can be overridden by derived classes
        public virtual void MakeSound()
        {
            Console.WriteLine("The animal makes a sound.");
        }

        // Method to display animal info
        public void ShowInfo()
        {
            Console.WriteLine($"This is {Name} the animal.");
        }
    }

    // Derived class Dog inheriting from Animal
    public class Dog : Animal
    {
        // Constructor that calls the base class constructor
        public Dog(string name) : base(name)
        {
        }

        // Overriding the MakeSound method to provide dog-specific behavior
        public override void MakeSound()
        {
            Console.WriteLine($"{Name} says Woof!");
        }
    }

    // Derived class Cat inheriting from Animal
    public class Cat : Animal
    {
        // Constructor that calls the base class constructor
        public Cat(string name) : base(name)
        {
        }

        // Overriding the MakeSound method to provide cat-specific behavior
        public override void MakeSound()
        {
            Console.WriteLine($"{Name} says Meow!");
        }
    }

    // Main program class
    class Program
    {
        static void Main(string[] args)
        {
            // Create instances of Dog and Cat
            Animal myDog = new Dog("Buddy");
            Animal myCat = new Cat("Whiskers");

            // Display info and make sounds
            myDog.ShowInfo();
            myDog.MakeSound();  // Polymorphism: Dog's version of MakeSound

            myCat.ShowInfo();
            myCat.MakeSound();  // Polymorphism: Cat's version of MakeSound

            Console.ReadLine();  // Wait for user input before closing
        }
    }
}
