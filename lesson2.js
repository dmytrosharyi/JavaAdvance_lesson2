class Human {
  constructor(obj) {
    this.name = obj.name;
    this.surname = obj.surname;
    this.age = obj.age;
    this.weight = obj.weight;
    this.height = obj.height;
    this.hair = obj.hair;
    this.nationality = obj.nationality;
    this.zodiac = obj.zodiac;
  }

  talk(string){
    console.log(`Привіт мене звати ${this.name}. ${string}`);
  }

  walk(speed, time){
    let distance = speed * time;
    console.log(`Пройдено ${distance}m`);
    return distance;
  }

  perform(taskName){
    const task = new Task(taskName);
    task.complete();
  }
}

class Task {
  constructor(name) {
    this.name = name;
    this.isCompleted = false;
  }
  complete(){
    console.log(`виконання завдання '${this.name}'`);
    this.isCompleted = true;
  }
}

class Man extends Human {
  constructor(obj) {
    super(obj);
    this.sex = 'man';
  }

  perform(taskName, type){
    if(type=='hard' || type=='dangerous'){
      super.perform(taskName);
    }
    else {
      console.log('Краще довірити цю роботу комусь іншому');
    }
  }
}

class Woman extends Human {
  constructor(obj, work) {
    super(obj);
    this.work = work;
    this.sex = 'woman';
  }

  perform(taskName, type){
    if(type=='safe' || type=='easy'){
      super.perform(taskName);
    }
    else{
      console.log('Краще довірити цю роботу комусь іншому');
    }
  }
}

class Librarian extends Woman {
  constructor(obj) {
    super(obj);
    this.job = 'librarian';
    this.list = [];
  }

  makeNewNote(animal){
    super.perform('Записати нову тварину в список', 'easy');
    this.list = this.list.concat(animal);
  }

  checkAnimals(animal){
    super.perform('Переглянути список', 'easy');
    console.log(`В нашому зоопарку є ${animal.name}`);
  }

  checkNotes(){
    console.log(this.list);
  }
}

class Nurse extends Woman {
  constructor(obj) {
    super(obj);
    this.job = 'nurse';
    this.sick = [];
    this.medicines = 0;
  }

  addSick(obj){
    super.perform('Прийняти хворого','safe');
    this.sick.push(obj);
  }

  buyMedicines(value){
    super.perform('Придбати ліки','easy');
    this.medicines += value;
  }

  cure(value){
    if(value <= this.medicines){
      super.perform('Лікувати хворого','safe');
      this.sick.splice(0, value);
      this.medicines -= value;
    }else{
      console.log('Недостатньо ліків');
    }
  }

  checkLists(){
    console.log(this.medicines);
    console.log(this.sick);
  }
}

class Hunter extends Man {
  constructor(obj){
    super(obj);
    this.job = 'hunter';
    this.animals = [];
    this.nets = 0;
  }

  buyNets(value){
    super.perform('Закупівля сіток','hard');
    this.nets += value;
  }

  catchAnimal(value, obj){
    if(value <= this.nets){
      super.perform('Ловля тварин','dangerous');
      let i = 0;
      while (i<value) {
        const beast = new Animal(obj);
        this.animals.push(beast);
        i++;
      }
      this.nets -= value;
    }else{
      console.log('Недостатня кількість сіток');
    }
  }

  checkNets(){
    console.log(this.nets);
  }
}

class Worker extends Man {
  constructor(obj) {
    super(obj);
    this.job = 'worker';
    this.foodValue = 0;
  }

  makeFood(){
    super.perform('Заготівля їжі','hard');
    this.foodValue += Math.floor(Math.random() * 5);
  }

  giveFood(value){
    if(value <= this.foodValue){
      super.perform('Видати їжу','hard');
      this.foodValue -= value;
      return value;
    }else{
      console.log('Недостатньо їжі');
    }
  }

  checkFood(){
    console.log(`Залишилось стільки одиниць їжі ${this.foodValue}`);
  }
}

class Animal {
  constructor(obj) {
    this.name = obj.name;
    this.specie = obj.specie;
    this.age = obj.age;
    this.energy = 0;
  }

  walk(speed){
    if(this.energy != 0){
      let distance = speed * this.energy;
      this.energy = 0;
      console.log(`Тварина пройшла ${distance}m`);
      return distance;
    }else{
      console.log(`Покорміть тварину`);
    }
  }

  eat(food){
    this.energy += food;
    console.log(`Ваша тварина з'їла ${food} одиниць їжі`);
  }
}

class Predator extends Animal {
  constructor(obj) {
    super(obj);
  }

  eat(food,type){
    if(type=='meat'){
      super.eat(food);
    }
    else{
      console.log(`Тварина не буде цього їсти`);
    }
  }
}

class Herbivorous  extends Animal {
  constructor(obj) {
    super(obj);
  }

  eat(food,type){
    if(type=='herb'){
      super.eat(food);
    }
    else{
      console.log(`Тварина не буде цього їсти`);
    }
  }
}

class ZooService {
  constructor(hunter,librarian,nurse,worker){
    this.hunter = hunter;
    this.librarian = librarian;
    this.nurse = nurse;
    this.worker = worker;
  }

  newAnimal(nets,number,animal){
    this.hunter.buyNets(nets);
    this.hunter.catchAnimal(number,animal);
    this.librarian.makeNewNote(animal);
  }

  feedAnimal(animal,foodValue,foodType){
    this.worker.makeFood();
    animal.eat(this.worker.giveFood(foodValue,foodType));
  }

  cureAnimal(medicines, animal, sickNumber){
    this.nurse.addSick(animal);
    this.nurse.buyMedicines(medicines);
    this.nurse.cure(sickNumber);
  }
}

const ZooApp = (function(){
  const nurse = new Nurse({name:'Tetiana',age:19,zodiac:'lion'});
  const librarian = new Librarian({name:'Anna',age:32,zodiac:'aquarius'});
  const hunter = new Hunter({name:'Alex',age:34,zodiac:'libra'});
  const worker = new Worker({name:'Volodymyr',age:40,zodiac:'scorpion'});

  const run = new ZooService(hunter, librarian, nurse, worker);

  let herb;
  let predator;

  function setAnimals(herb,pred){
    herb = new Herbivorous(herb);
    predator = new Predator(pred);
  }

  function zooLife(nets,animalNumber,foodValue,foodType,medicines,sickNumber,herb,pred){
    setAnimals(herb,pred);
    run.newAnimal(nets,animalNumber,herb);
    run.feedAnimal(predator,foodValue,foodType);
    run.cureAnimal(medicines,herb,sickNumber);
  }

  return{
    zooLife:zooLife
  }

})();

ZooApp.zooLife(4,2,1,'meat',6,2,{name:'horse'},{name:'lion'});