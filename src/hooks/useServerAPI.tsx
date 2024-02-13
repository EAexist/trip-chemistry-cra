interface useServerApiProps{
    path: string; 
    handleResponse?:(data: any)=>void; 
    handleNoResponse?:()=>void; 
    fetchProps:{
        method: 'GET' | 'POST' | 'PUT'; 
        headers: any
        // {
        //     "Content-Type": "application/json",
        // },
        body?: any,
    };
};

const useServerAPI = ({path, fetchProps}:useServerApiProps) => {

    return(
        fetch(path, fetchProps) 
            .then((response) => {
                if(!response.ok) throw new Error(response.statusText);
                else return response.json();
        })
    );
}


const useServerApi = ({ path, fetchProps }:useServerApiProps) => {

    return(
        fetch( path, fetchProps ) 
            .then((response) => {
                // console.log(`[useServerAPI] response=${JSON.stringify(response.json())}`);
                if(!response.ok) throw new Error(response.statusText);
                else return response;
        })
    );
}

export default useServerAPI;
export { useServerApi };