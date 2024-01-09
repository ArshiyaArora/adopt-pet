import { Component } from "react";
// import { Link } from "react-router-dom";

class ErrorBoundary extends Component{
    state={hasError: false};

    static getDerivedStateFromError(){
        return {hasError:true};
    }

    componentDidCatch(error,info){
        //typically you will log this to something like TrackJS or NewRelic
        console.log("ErrorBoundary component catched an error",error,info);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.errorComponent
              );
        }
    
        return this.props.children;
      }
    }
    
    export default ErrorBoundary;
