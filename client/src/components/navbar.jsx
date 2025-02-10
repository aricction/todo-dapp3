const NavBar = ({handleLogin, account})=>{
    return (
        <div className="flex flex-row justify-between w-[full] h-[80px] p-5 relative top-0 bg-white ">
          <p className="text-2xl font-semibold">Dashboard</p>

            <div className="flex items-center w-[350px]">
                    <button onClick={handleLogin} className="bg-blue-500 w-[50%] text-white p-2 rounded-md mb-2">
                      Connect Wallet
                    </button>
                    {/* Show Connected Wallet Address */}
                    {account && (
                      <p className="text-green-700 text-sm font-semibold">
                        Connected
                      </p>
                    )}
                  </div>
        </div>
    )
}

export default NavBar;