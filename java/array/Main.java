public class Main {

  public static final int CREATE_VALUE = 1;
  public static final int INSERT_VALUE = 2;
  public static final int PRINT_VALUE = 3;
  public static final int PRINT_ALL_VALUE = 4;
  public static final int UPDATE_VALUE = 5;
  public static final int DELETE_VALUE = 6;
  public static final int DESTROY_VALUE = 7;
  public static final int RECREATE_VALUE = 8;
  public static final int EXIT_VALUE = 9;

  public static void main(String[] args) {
    Boolean status = true;
    SDA array = new SDA();
    while (status) {
      operations();
      String option = System.console().readLine("Choose an option : ");
      int op = safeParse(option);
      status = operate(array, op); 
    }
  }

  public static void operations() {
    System.out.println("Array operations");
    System.out.println(Integer.toString(CREATE_VALUE) + ". Create the array");
    System.out.println(Integer.toString(INSERT_VALUE) + ". Insert item into the array");
    System.out.println(Integer.toString(PRINT_VALUE) + ". Print item from the array");
    System.out.println(Integer.toString(PRINT_ALL_VALUE) + ". Print all items of the array");
    System.out.println(Integer.toString(UPDATE_VALUE) + ". Update item in the array");
    System.out.println(Integer.toString(DELETE_VALUE) + ". Delete item in the array");
    System.out.println(Integer.toString(DESTROY_VALUE) + ". Destroy the array");
    System.out.println(Integer.toString(RECREATE_VALUE) + ". Recreate the array");
    System.out.println(Integer.toString(EXIT_VALUE) + ". Exit program");
  }

  public static int safeParse(String operation) {
    try {
      return Integer.parseInt(operation);
    } catch (NumberFormatException nfe) {
      System.out.println("Please enter a number value!");
      return Integer.MIN_VALUE;
    } catch (Exception ex) {
      System.out.println("There is something terribly wrong with the program");
      return EXIT_VALUE;
    }
  }

  public static String getInput(String prefix, String context) {
    return System.console().readLine(prefix + "Please enter the " + context + " :");
  }

  public static Boolean operate(SDA array, int op) {
    boolean result = true;
    String location;
    String item;
    String sizeOfArray;
    switch(op) {
      case CREATE_VALUE:
        sizeOfArray = getInput("CREATE - ", "Array Size");
        array.initialize(sizeOfArray);
        break;
      case INSERT_VALUE:
        location = getInput("INSERT - ", "location");
        item = getInput("INSERT - ", "value");
        array.insert(location, item);
        break;
      case PRINT_VALUE:
        location = getInput("PRINT - ", "location");
        array.print(location);
        break;
      case PRINT_ALL_VALUE:
        array.printAll();
        break;
      case UPDATE_VALUE:
        location = getInput("UPDATE - ", "location");
        item = getInput("UPDATE - ", "value");
        array.update(location, item);
        break;
      case DELETE_VALUE:
        location = getInput("DELETE - ", "location");
        array.delete(location);
        break;
      case DESTROY_VALUE:
        array.destroy();
        break;
      case RECREATE_VALUE:
        sizeOfArray = getInput("RECREATE - ", "Array Size");
        array.recreate(sizeOfArray);
        break;
      case EXIT_VALUE:
        System.out.println("See ya around!");
        result = false;
        break;
      default:
        System.out.println("Please enter a valid option"); 
    }
    System.out.println("\n===================\n");
    return result;
  }
}