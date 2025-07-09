import React, { useState, useEffect } from 'react'
import './App.css'
import { emails, Email } from './data'
import { useEmailAnalysis, AnalyzedEmail } from './emailAnalysis'

function App() {
  const [selectedEmail, setSelectedEmail] = useState<AnalyzedEmail | null>(null)
  const [analyzedEmails, setAnalyzedEmails] = useState<AnalyzedEmail[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { analyzeMultipleEmails, loading } = useEmailAnalysis()

  const performAnalysis = async () => {
    setIsAnalyzing(true)
    try {
      const analyzed = await analyzeMultipleEmails(emails)
      setAnalyzedEmails(analyzed)
    } catch (error) {
      console.error('Error analyzing emails:', error)
      // Fallback to original emails without analysis
      setAnalyzedEmails(emails.map(email => ({ ...email, isCritical: false })))
    } finally {
      setIsAnalyzing(false)
    }
  }

  const analyzeRecentEmails = async () => {
    setIsAnalyzing(true)
    try {
      // Sort emails by timestamp (most recent first) and take the first 5
      const sortedEmails = [...emails].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      const recentEmails = sortedEmails.slice(0, 5)
      
      // Analyze only the recent emails
      const analyzedRecent = await analyzeMultipleEmails(recentEmails)
      
      // Merge with existing analyzed emails, keeping non-recent emails as they were
      const remainingEmails = emails.filter(email => 
        !recentEmails.some(recent => recent.message_id === email.message_id)
      ).map(email => ({ ...email, isCritical: false }))
      
      const allAnalyzed = [...analyzedRecent, ...remainingEmails]
      setAnalyzedEmails(allAnalyzed)
    } catch (error) {
      console.error('Error analyzing recent emails:', error)
      // Fallback to original emails without analysis
      setAnalyzedEmails(emails.map(email => ({ ...email, isCritical: false })))
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleEmailClick = (email: AnalyzedEmail) => {
    setSelectedEmail(email)
  }

  const handleBackToInbox = () => {
    setSelectedEmail(null)
  }

  return (
    <div className="app">
      <div className="header">
        <div>
          <img src="https://storage.googleapis.com/coderpad_project_template_assets/coderpad_logo.svg" />
        </div>
        <div>
          <img src="https://storage.googleapis.com/coderpad_project_template_assets/react.svg" />
          <span>Email Inbox</span>
        </div>
      </div>
      
      <div className="content">
        {selectedEmail ? (
          <EmailDetail email={selectedEmail} onBack={handleBackToInbox} />
        ) : (
          <EmailList 
            emails={analyzedEmails} 
            onEmailClick={handleEmailClick}
            isAnalyzing={isAnalyzing}
            onAnalyzeRecent={analyzeRecentEmails}
          />
        )}
      </div>
      
      <div className="footer">
        Simple Email Inbox - {emails.length} messages
      </div>
    </div>
  )
}

interface EmailListProps {
  emails: AnalyzedEmail[]
  onEmailClick: (email: AnalyzedEmail) => void
  isAnalyzing: boolean
  onAnalyzeRecent: () => void
}

function EmailList({ emails, onEmailClick, isAnalyzing, onAnalyzeRecent }: EmailListProps) {
  const criticalEmails = emails.filter(email => email.isCritical === true)
  const nonCriticalEmails = emails.filter(email => email.isCritical === false)

  if (isAnalyzing) {
    return (
      <div className="email-list">
        <div className="analyzing-container">
          <div className="analyzing-spinner"></div>
          <h3>Analyzing emails with AI...</h3>
          <p>Determining which emails are critical based on content analysis.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="email-list">
      <div className="inbox-header">
        <h2>Inbox ({emails.length})</h2>
        <button 
          className="analyze-button"
          onClick={onAnalyzeRecent}
          disabled={isAnalyzing}
        >
          🤖 Analyze Recent 5 Emails
        </button>
      </div>
      
      {criticalEmails.length > 0 && (
        <div className="email-section">
          <h3 className="section-title critical-section">
            🚨 Critical Emails ({criticalEmails.length})
          </h3>
          {criticalEmails.map((email) => (
            <EmailPreview 
              key={email.message_id} 
              email={email} 
              onClick={() => onEmailClick(email)}
              isCritical={true}
            />
          ))}
        </div>
      )}
      
      {nonCriticalEmails.length > 0 && (
        <div className="email-section">
          <h3 className="section-title non-critical-section">
            📧 Regular Emails ({nonCriticalEmails.length})
          </h3>
          {nonCriticalEmails.map((email) => (
            <EmailPreview 
              key={email.message_id} 
              email={email} 
              onClick={() => onEmailClick(email)}
              isCritical={false}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface EmailPreviewProps {
  email: AnalyzedEmail
  onClick: () => void
  isCritical: boolean
}

function EmailPreview({ email, onClick, isCritical }: EmailPreviewProps) {
  const getTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div 
      className={`email-preview ${email.status === 'unread' ? 'unread' : ''} ${isCritical ? 'critical' : ''}`}
      onClick={onClick}
    >
      <div className="email-preview-header">
        <span className="sender">{email.sender}</span>
        <div className="header-right">
          {isCritical && <span className="critical-badge">CRITICAL</span>}
          <span className="timestamp">{getTimeAgo(email.timestamp)}</span>
        </div>
      </div>
      <div className="subject">{email.subject}</div>
      <div className="body-preview">
        {email.body.substring(0, 100)}
        {email.body.length > 100 ? '...' : ''}
      </div>
      <div className="email-meta">
        {email.attachments.length > 0 && (
          <span className="attachment-indicator">📎</span>
        )}
        <span className={`importance importance-${email.importance}`}>
          {email.importance.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

interface EmailDetailProps {
  email: AnalyzedEmail
  onBack: () => void
}

function EmailDetail({ email, onBack }: EmailDetailProps) {
  return (
    <div className="email-detail">
      <div className="email-detail-header">
        <button onClick={onBack} className="back-button">← Back to Inbox</button>
        <h2>Email Details</h2>
        {email.isCritical && <span className="critical-badge large">CRITICAL</span>}
      </div>
      
      <div className="email-detail-content">
        <div className="detail-field">
          <label>From:</label>
          <span>{email.sender}</span>
        </div>
        
        <div className="detail-field">
          <label>To:</label>
          <span>{email.recipients.join(', ')}</span>
        </div>
        
        <div className="detail-field">
          <label>Subject:</label>
          <span>{email.subject}</span>
        </div>
        
        <div className="detail-field">
          <label>Date:</label>
          <span>{new Date(email.timestamp).toLocaleString()}</span>
        </div>
        
        <div className="detail-field">
          <label>Importance:</label>
          <span className={`importance importance-${email.importance}`}>
            {email.importance.toUpperCase()}
          </span>
        </div>
        
        {email.isCritical !== undefined && (
          <div className="detail-field">
            <label>AI Analysis:</label>
            <span className={`criticality-status ${email.isCritical ? 'critical' : 'non-critical'}`}>
              {email.isCritical ? '🚨 CRITICAL' : '📧 REGULAR'}
            </span>
          </div>
        )}
        
        {email.labels.length > 0 && (
          <div className="detail-field">
            <label>Labels:</label>
            <div className="labels">
              {email.labels.map((label, index) => (
                <span key={index} className="label">{label}</span>
              ))}
            </div>
          </div>
        )}
        
        {email.attachments.length > 0 && (
          <div className="detail-field">
            <label>Attachments:</label>
            <div className="attachments">
              {email.attachments.map((attachment, index) => (
                <a key={index} href={attachment} target="_blank" rel="noopener noreferrer">
                  📎 Attachment {index + 1}
                </a>
              ))}
            </div>
          </div>
        )}
        
        <div className="detail-field message-body">
          <label>Message:</label>
          <div className="body-content">{email.body}</div>
        </div>
      </div>
    </div>
  )
}

export default App 