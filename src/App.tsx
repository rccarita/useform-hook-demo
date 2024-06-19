import { useForm } from "react-hook-form"

function App() {

  const { register, handleSubmit,
    formState: { errors }, watch, setValue, reset
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    //antes de enviar getPostData()
    //enviar al servidor
    alert('sending data....')
    reset();
    console.log(data)
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Nombre</label>
      <input type="text" id="name"
        {...register("name", {
          required: { value: true, message: 'Nombre es requerido' },
          minLength: { value: 2, message: 'Nombre debe tener al menos 2 caracteres' },
          maxLength: { value: 20, message: 'Nombre debe tener como máximo 20 caracteres' }
        })} />
      {errors.name && <span>{errors.name.message as string}</span>}

      <label htmlFor="email">Correo</label>
      <input type="email" id="email" {...register("email", {
        required: { value: true, message: 'Email es requerido' },
        pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i, message: 'Email inválido' },
      })} />
      {errors.email && <span>{errors.email.message as string}</span>}

      <label htmlFor="password">Contraseña</label>
      <input type="password" id="password" {...register("password", {
        required: { value: true, message: 'Contraseña es requerida' },
        minLength: { value: 6, message: 'Contraseña debe tener al menos 6 caracteres' },
      })} />
      {errors.password && <span>{errors.password.message as string}</span>}

      <label htmlFor="confirmPassword">Confirmar Contraseña</label>
      <input type="password" id="confirmPassword" {...register("confirmPassword", {
        required: { value: true, message: 'Confirmar Contraseña es requerido' },
        validate: (value) => {
          return value === watch('password') || 'Las contraseñas no coinciden';
        }
      })} />
      {errors.confirmPassword && <span>{errors.confirmPassword.message as string}</span>}

      {/*Cellphone*/}
      <label htmlFor="cellphone">Celular</label>
      <input type="text" id="cellphone" {...register("cellphone", { required: true })} />

      <label htmlFor="dateBirth">Fecha de Nacimiento</label>
      <input type="date" id="dateBirth" {...register("dateBirth", {
        required: { value: true, message: 'Fecha de Nacimiento requerido' },
        validate: (value) => {
          const dateBirth = new Date(value);
          const today = new Date();
          const year = today.getFullYear() - dateBirth.getFullYear();
          return year >= 18 || 'Debe ser mayor de edad';
        }
      })} />
      {errors.dateBirth && <span>{errors.dateBirth.message as string}</span>}

      <label htmlFor="country">País</label>
      <select {...register("country")}>
        <option value="ar">Argentina</option>
        <option value="br">Brasil</option>
        <option value="ch">Chile</option>
        <option value="co">Colombia</option>
        <option value="ec">Ecuador</option>
        <option value="pe">Perú</option>
        <option value="ur">Uruguay</option>
        <option value="ve">Venezuela</option>
      </select>

      {watch('country') === 'ar' && (
        <>
          <input type="text" placeholder="--Seleccionar Provincia" {...register('district', {
            required: { value: true, message: 'Requerido' },
          })} />
          {errors.district && <span>{errors.district.message as string}</span>}
        </>
      )}

      <label htmlFor="file">Archivo</label>
      <input type="file" id="file" onChange={(e) => {
        setValue('userFile', e.target.files?.[0]?.name)
      }} />

      <label htmlFor="terms">Acepto los términos y condiciones</label>
      <input type="checkbox" id="terms" {...register("terms", {
        required: { value: true, message: 'Terminos y condiciones es requerido' }
      })} />
      {errors.terms && <span>{errors.terms.message as string}</span>}

      <button type="submit">Enviar</button>

      <pre>
        {JSON.stringify(watch(), null, 2)}
      </pre>
    </form>
  )
}

export default App