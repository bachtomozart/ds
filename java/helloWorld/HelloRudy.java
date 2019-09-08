class HelloRudy {

  public static final int SAY_HELLO = 1;
  public static final int SOMETHING_WRONG = 2;
  public static final int WHO_ARE_YOU = 3;
  public static final int EXIT_VALUE = 4;

  public static void main(String[] args) {
    Boolean status = true;
    while (status) {
      greetings();
      String operation = System.console().readLine("What? : ");
      int op = safeParse(operation);
      status = operate(op); 
    }
  }

  public static void greetings() {
    System.out.println("Your options");
    System.out.println(Integer.toString(SAY_HELLO) + ". Greet you");
    System.out.println(Integer.toString(SOMETHING_WRONG) + ". Something's wrong");
    System.out.println(Integer.toString(WHO_ARE_YOU) + ". Who are you");
    System.out.println(Integer.toString(EXIT_VALUE) + ". Just Get out");
  }

  public static int safeParse(String operation) {
    try {
      return Integer.parseInt(operation);
    } catch (NumberFormatException nfe) {
      System.out.println("Hey chubby fingers!, consider yourself lucky that I atleast respond to numbers!!");
      return Integer.MIN_VALUE;
    } catch (Exception ex) {
      System.out.println("There is something terribly wrong with the program");
      return EXIT_VALUE;
    }
  }

  public static Boolean operate(int op) {
    boolean result = true;
    switch(op) {
      case SAY_HELLO:
        String name = System.console().readLine("Who are you? : ");
        if(Math.random() > 0.5) {
          System.out.println("Hello " + name + "!...., now get out!");
        } else {
          System.out.println("Hello Felicia!, Feel better?");
        }
        break;
      case SOMETHING_WRONG:
        System.out.println("Something's wrong? Oh I'm sorry, I Don't give a rat's ass to your problem!!!");
        break;
      case WHO_ARE_YOU:
        System.out.println("I'm Rudy!, now fuck off!!");
        break;
      case EXIT_VALUE:
        System.out.println("Good God!, Finally it's happening.... Bye Felicia!");
        result = false;
        break;
      default:
        System.out.println("Do you even know how to read?");
        System.out.println("Cause that's not a valid option you Dumb fuck!!"); 
    }
    System.out.println("\n===================\n");
    return result;
  }

}