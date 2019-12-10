import React from 'react';

class ErrorPage extends React.Component {


    render() {
        return (
            <div className="text-center d-flex flex-column justify-content-center min-vh-100">
                <div className={'container'}>
                    <div className="col-12 col-md-6 offset-md-3">
                        <img src={require("../../assets/images/404.jpg")} width={'100%'} alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ErrorPage;