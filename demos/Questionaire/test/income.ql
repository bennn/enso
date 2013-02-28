
hasSoldHouse: "Did you sell a house in 2010?" money
hasBoughtHouse: "Did you buy a house in 2010?" money
hasMaintLoan: "Did you enter a loan for maintenance/reconstruction?" money

if (not hasSoldHouse) {
  sellingPrice: "Price the house was sold for:" money
  privateDebt: "Private debts for the sold house:" money
  valueResidue: "Value residue:" money
}

answers

boolean : bool ( "Yes" "No" )
locations : str [ "Austin" "Amsterdam" "Cambridge" ]
money : int 
value : int = (sellingPrice - privateDebt)
