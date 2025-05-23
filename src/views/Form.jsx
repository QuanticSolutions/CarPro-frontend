import AdForm from '../components/form/AdForm';

function Form({ title, type, updating, category }) {

  return (
    <>
      <AdForm title={title} type={type} isUpdating={updating} category={category} />
    </>
  );
}

export default Form;