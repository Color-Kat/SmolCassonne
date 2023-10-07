export const LoadingMessage = ({text = 'Loading...'}: {text?: string}) => {
    return ( 
        <p className="text-center my-2">{text}</p>
    );
};