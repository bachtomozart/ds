class PBV {
	public static void main(String args[]) {
		Hunter hunter = new Hunter("George", "Timothy");
		System.out.println(hunter.name);
		System.out.println(hunter.huntingDog.name);
		Dog huntingDog = hunter.huntingDog;
		huntingDog.name = "Karuppi";
		System.out.println(hunter.huntingDog.name);
	}
}

class Hunter {
	public Hunter(String name, String huntingDog) {
		this.name = name;
		this.huntingDog = new Dog(huntingDog);
	}
	public String name;
	public Dog huntingDog;
}

class Dog {
	public Dog(String name) {
		this.name = name;
	}
	public String name;
}