const list = ["Dairymaid", "Ekuzeni", "Emperor Foods"];

export default (companyName = index => {
  return list[parseInt(index) - 3];
});
