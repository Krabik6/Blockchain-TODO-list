import {useState} from 'react'
import ToDo from "./components/ToDo";
import ToDoForm from "./components/ToDoForm";
import TODOabi from './components/TODOabi';
import Web3 from 'web3';


function App() {

  const {todos, setTodos} = useState([])

  const connectMetamask = async() => {
  }
  
  //contract function
  const setTask = async(node, chainId, TODOaddress, description) => {

    const provider = await detectEthereumProvider({ 
			mustBeMetaMask: true 
		  }) 
		  if (provider) { 
			try { 
				const accounts = await provider.request({ method: 'eth_requestAccounts' });
				const userAddress = accounts[0]

				const web3 = new Web3(node)
			
				const TODOcontract = await new web3.eth.Contract(TODOabi, TODOaddress, {
					from: userAddress
				  });
			
				const rawTransaction = {
					//"gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
					//"gasLimit": web3.utils.toHex(gasLimit),
					"to": TODOaddress,
					"data": await TODOcontract.methods.setTask(description).encodeABI(), 
					"chainId": chainId
				  };

				const hash = await provider.request({
					method: 'eth_sendTransaction',
					params: [
						{
						from: accounts[0],
					    ...rawTransaction 
						}
					],
				})

        return hash
        				 
			} catch(e) { 
			  console.error (e) 
			  return false
			} 
		  } else { 
			console.error('Please install MetaMask') 
			return false
		  }           

  }

  //contract function
  const toggleCompleted = async(node, chainId, TODOaddress, ID) => {

    const provider = await detectEthereumProvider({ 
			mustBeMetaMask: true 
		  }) 
		  if (provider) { 
			try { 
				const accounts = await provider.request({ method: 'eth_requestAccounts' });
				const userAddress = accounts[0]

				const web3 = new Web3(this.node)
			
				const TODOcontract = await new web3.eth.Contract(TODOabi, TODOaddress, {
					from: userAddress
				  });
			
				const rawTransaction = {
					//"gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
					//"gasLimit": web3.utils.toHex(gasLimit),
					"to": TODOaddress,
					"data": await TODOcontract.methods.toggleCompleted(ID).encodeABI(), 
					"chainId": chainId
				  };

				await provider.request({
					method: 'eth_sendTransaction',
					params: [
						{
						from: accounts[0],
					    ...rawTransaction 
						}
					],
				  })
				 
			} catch(e) { 
			  console.error (e) 
			  return false
			} 
		  } else { 
			console.error('Please install MetaMask') 
			return false
		  }           

  }

  //contract function
  const tasks = async(node, chainId, TODOaddress, ID) => {

			const web3 = new Web3(this.node)
			
			const TODOcontract = await new web3.eth.Contract(TODOabi, TODOaddress);

      const tasksData = await TODOcontract.methods.tasks(ID).encodeABI()
			        

  }


  return (
    <div className="App">
      <header>
        <h1>Список задач: </h1>
      </header>
    </div>
  );
}

export default App;
