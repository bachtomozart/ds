public class SDA {

  private int array[];
  private boolean initialized;
  
  public SDA() {
    this.initialized = false;
  }

  public boolean initialize(String strSizeOfArray) {
    String prefix = "CREATE - ";
    return this.initialize(prefix, strSizeOfArray);
  }

  public boolean initialize(String prefix, String strSizeOfArray) {
    int sizeOfArray = getInteger(strSizeOfArray);
    if (sizeOfArray != Integer.MIN_VALUE) {
      this.array = new int[sizeOfArray];
      this.initialized = true;
      this.fillInitializedArray(prefix);
      System.out.println(prefix + "Array initialized of size - " + Integer.toString(this.array.length));
      this.printAll(prefix);
    } else {
      this.warnNotAnInteger(prefix, "size of array");
    }
    return this.initialized;
  }

  public void insert(String strLocation, String strItem) {
    String prefix = "INSERT - ";
    if (this.initialized) {
      int location = getInteger(strLocation);
      int item = getInteger(strItem); 
      if(this.validate(prefix, location, item)) {
        if(this.array[location] != Integer.MIN_VALUE) {
          System.out.println(prefix + "The given location is not empty");
        } else {
          // LOGIC
          this.array[location] = item;
          System.out.println(prefix + "The given item was inserted successfully");
          this.printAll(prefix);
        }
      }
    } else {
      this.warnEmptyArray(prefix);
    }
  }

  public void print(String strLocation) {
    String prefix = "PRINT - ";
    if (this.initialized) {
      int location = getInteger(strLocation);
      if(this.validate(prefix, location)) {
        // LOGIC
        int item = this.array[location];
        System.out.println(prefix + "The value at location Array[" + Integer.toString(location) + "] = " + Integer.toString(item));
      }
    } else {
      this.warnEmptyArray(prefix);
    }
  }

  public void printAll() {
    this.printAll("PRINT ALL - ");
  }

  public void printAll(String prefix) {
    if (this.initialized) {
      StringBuilder sb = new StringBuilder((this.array.length * 2));
      // LOGIC
      for(int i=0;i<this.array.length;i++) {
        int item = this.array[i];
        sb.append(Integer.toString(item));
        if(i != (this.array.length - 1)) {
          sb.append(",");
        }
      }
      System.out.println(prefix + "Array[" + Integer.toString(this.array.length) + "] -> [" + sb.toString() + "]");
    } else {
      warnEmptyArray(prefix);
    }
  }

  public void update(String strLocation, String strItem) {
    String prefix = "UPDATE - ";
    if (this.initialized) {
      int location = getInteger(strLocation);
      int item = getInteger(strItem); 
      if(this.validate(prefix, location, item)) {
        int oldItem = this.array[location];
        // LOGIC
        this.array[location] = item;
        System.out.println(prefix + "The old value - " + Integer.toString(oldItem) + " has been updated to the new value - " + Integer.toString(item));
        this.printAll(prefix);
      }
    } else {
      this.warnEmptyArray(prefix);
    }
  }

  public void delete(String strLocation) {
    String prefix = "DELETE - ";
    if (this.initialized) {
      int location = getInteger(strLocation);
      if(this.validate(prefix, location)) {
        int oldItem = this.array[location];
        this.array[location] = Integer.MIN_VALUE;
        System.out.println(prefix + "Successfully deleted item " + Integer.toString(oldItem));
        this.printAll(prefix);
      }
    } else {
      this.warnEmptyArray(prefix);
    }
  }

  public boolean destroy() {
    String prefix = "DESTROY - ";
    return this.destroy(prefix);
  }

  public boolean destroy(String prefix) {
    this.array = null;
    this.initialized = false;
    System.out.println(prefix + "Array destroyed");
    return this.initialized;
  }

  public boolean recreate(String strSizeOfArray) {
    String prefix = "RECREATE - ";
    int sizeOfArray = getInteger(strSizeOfArray);
    if (sizeOfArray != Integer.MIN_VALUE) {
      this.destroy(prefix);
      this.initialize(prefix, strSizeOfArray);     
    } else {
      this.warnNotAnInteger(prefix, "size of array");
    }
    return this.initialized;
  }

  private void warnEmptyArray(String prefix) {
    System.out.println(prefix + "The Array is not initialized , please create it first");
  }

  private void warnNotAnInteger(String prefix, String context) {
    System.out.println(prefix + "The given " + context + " is not an integer, please try again");
  }

  private void warnOutOfBoundsLocation(String prefix) {
    System.out.println(prefix + "The given location is out of bounds, please try again");
  }

  private int getInteger(String item) {
    try {
      int valerie = Integer.parseInt(item);
      return valerie;
    } catch (NumberFormatException nfe) {
      return Integer.MIN_VALUE;
    } catch (Exception ex) {
      return Integer.MIN_VALUE;
    }
  }

  private boolean validate(String prefix, int location) {
    return this.validate(prefix, location, 0);
  }

  private boolean validate(String prefix, int location, int item) {
    if(item == Integer.MIN_VALUE) {
      this.warnNotAnInteger(prefix, "item");
      return false;
    } else if (location == Integer.MIN_VALUE) {
      this.warnNotAnInteger(prefix, "location");
      return false;
    } else if (location < 0 || location > (this.array.length - 1)) {
      this.warnOutOfBoundsLocation(prefix);
      return false;
    } else {
      return true;
    }
  }

  private void fillInitializedArray(String prefix) {
    if(this.initialized) {
      for(int i=0;i<this.array.length;i++) {
        //this.array[i] = Integer.MIN_VALUE;
        this.array[i] = i;
      }
    } else {
      this.warnEmptyArray(prefix);
    }
  }
}