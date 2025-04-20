import SenderForm from './components/SenderForm';
import ReceiverInput from './components/ReceiverInput';
import TemplateEditor from './components/TemplateEditor';
import Scheduler from './components/Scheduler';

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Email Marketing Platform</h1>
      <SenderForm />
      <ReceiverInput />
      <TemplateEditor />
      <Scheduler />
    </main>
  );
}
