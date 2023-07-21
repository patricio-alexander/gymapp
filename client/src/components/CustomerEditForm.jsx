import CustomerForm from "./CustomerForm";
import CustomerCard from "./CustomerCard";

function CustomerEditForm() {
  return (
    <>
      <div className="section">
        <div className="columns">
          {/* <div className="column is-4">
            <CustomerCard />
          </div> */}
          <div className="column">
            <CustomerForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerEditForm;
